'use strict';

module.exports = function(ex, apiPath, file) {
    return  `Error in api ${apiPath} due to ${file}: \n${ex}`
}
