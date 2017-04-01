var fs = require('fs'),
 	path = require('path'),
 	jsonServer = require('./libs/json-server');

var srcPath = "rest";
var dbFileName = "db.json";
var configFileName = "config.js";
var port = process.env.PORT || 3000;
var stubberApp = jsonServer.create();
stubberApp.use(jsonServer.defaults());

stubberApp.use(function (req, res, next) {
	if(req.method === 'POST'){
		req.method = 'GET';
	}
  	next();
});

var getFolders = function(inputPath){
	return fs.readdirSync(inputPath).filter(function(file) {
		return fs.statSync(path.join(inputPath, file)).isDirectory();
	});
};

var containsDb = function(inputPath){
	return fileExists(inputPath, dbFileName); 
};
var fileExists = function(inputPath, fileName) {
	try {
	   fs.accessSync(inputPath+ "/" + fileName);
	   return true;
	} catch (e) {
	    return false;
	}
}; 
var getConfig = function(inputPath, folder) {
	var config; 

	if(fileExists(inputPath + '/' + folder, configFileName)) {
		config = require('./' + inputPath + '/' + folder + '/' + configFileName);
	}
	
	return config; 
}; 
var setRoutes = function(inputPath, config){
	var dbPath = inputPath +"/"+ dbFileName;
	var apiPath = inputPath.replace("rest/", "");

	var route = jsonServer.router(dbPath); 

	if(config !== undefined && config.response !== undefined && config.response.formatBody !== undefined){
		route.render = function (req, res) {
			res.jsonp(config.response.formatBody(res));
		}
	}

	stubberApp.use("/"+apiPath, route);
	console.log(`    > ${apiPath}`);
	//console.log(`    > ${apiPath} ==> ${dbPath}`);
};
var recoursiveJsonServer = function(inputPath, config){
	getFolders(inputPath).forEach(function(folder) {
		var localPath = inputPath +"/"+ folder;
		var contains = containsDb(localPath);
		if (getFolders(inputPath+"/"+folder).length > 0){	
			// if has subfolders call recursively itself on every child
			recoursiveJsonServer(inputPath+"/"+folder, config);
		}
		if (contains){
			// set route for json server
			setRoutes(localPath, config);	
		}
	});
};

var createJsonServer = function(inputPath) {
	getFolders(inputPath).forEach(function(folder) {

		console.log("  # "+folder);

		var config = getConfig(inputPath, folder); 
		var localPath = inputPath +"/"+ folder;
		var contains = containsDb(localPath);
		if (getFolders(inputPath+"/"+folder).length > 0){	
			// if has subfolders call recursively itself on every child
			recoursiveJsonServer(inputPath+"/"+folder, config);
		}
		if (contains){
			// set route for json server
			setRoutes(localPath, config);	
		}
	});
}; 

console.log("List of api:");
createJsonServer(srcPath);

console.log("Made with ♥ and bighe!");

stubberApp.listen(port, function () {
  //console.log('JSON Server is running on port', port);
});