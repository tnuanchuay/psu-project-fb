var config = require("./utils/config");
var mongo = require("mongodb");
var fetcher = require("./fetcher/main")
var api = require("./api/main");
var prom = require("prom-client");

mongo.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbname}`, function(err, db){
    if(err){
        console.log(err);
        process.exit(1);
    }
    //add your service here
    fetcher(config, db, prom);
    api(config, db);
});
