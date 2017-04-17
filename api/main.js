module.exports = main
var error = require("../utils/onerror");
function main(config, db, measurement){
    var express = require("express");
    var bodyParser = require("body-parser");
    var app = express();
    var posts = db.collection("posts");
    var detail = db.collection("post_details");
    app.use(bodyParser.urlencoded({extended:false}));

    app.use(function(req, res, next){
        measurement.api.numberOfRequest.increment();
        next();
    });

    app.use((req, res, next) => {
        res.type("json");
        next();
    })

    app.get("/posts", function(req, res){
        detail.find({}).toArray((err, array)=>{
            error(err);
            res.end(JSON.stringify(array));
        })
    })

    app.listen(config.api.port);
}