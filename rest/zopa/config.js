'use strict';

var config = {
    response: {
        formatBody: function(res) {

            if(Object.keys(res.locals.data).length === 0 && res.locals.data.constructor === Object)
                res.locals.data = null; 

            return  res.locals.data;
        }
    }
};

module.exports = config; 
