module.exports = {
	"graphToken": "",
	"secret": "bccc5655ee238576064f1ae79c731fae",
	"clientId": "1920667534830924",
	"db": {
		"host": "localhost",
		"port": 27017,
		"dbname": "psu-project"
	},
	"version": "",
	"api": {
		"port": 8000
	},
	"test": false,
	init: function () {
		var fs = require('fs');
		this.graphToken = fs.readFileSync("token.conf");
		this.version = fs.readFileSync("version.conf");
		return this;
	},
	writeNewToken: function (token) {
		var fs = require('fs');
		fs.writeFileSync("token.conf", token);
	}
}.init();