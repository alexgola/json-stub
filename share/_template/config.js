ko.applyBindings({
	title : "Template",
    bgApp : "https://source.unsplash.com/1600x900/?nature",
	app : [{
        type    : 'ios',
		version : "1.0",
		name    : "iOS Prod",
		path 	: "https://stub.herokuapp.com/share/_template/manifest.plist"
	},{
        type    : 'ios',
		version : "1.1",
		name    : "iOS Test",
		path 	: "https://stub.herokuapp.com/share/_template/manifest.plist"
	},{
        type    : 'android',
		version	: "1.2",
		name    : "Android Prod",
		path 	: "https://stub.herokuapp.com/share/_template/app.apk"
	},{
        type    : 'android',
		version	: "1.3",
		name    : "Android Test",
		path 	: "https://stub.herokuapp.com/share/_template/app.apk"
	}]
});