module.exports = main

var error = require("../utils/onerror");
var pool = require("./pool");
function main(config, db, measurement, graph) {
    var posts = db.collection("posts");

    function newTokenSession() {
        graph.extendAccessToken({
            "access_token": config.graphToken
            , "client_id": config.clientId
            , "client_secret": config.secret
        }, function (err, facebookRes) {
            console.log(err);
            console.log(facebookRes);
        });
    }

    function extendToken() {
        graph.extendAccessToken({
            "client_id": config.clientId,
            "client_secret": config.secret
        }, (err, res) => {
            error(err);

            if (res.message) {
                console.log(res.message)
            } else {
                config.writeNewToken(res.access_token);
                graph.setAccessToken(res.access_token);
            }
        });
    }

    function fetchPost() {
        graph.get("1834630993529478/posts?fields=message,id&limit=100"
            , function (err, res) {
                error(err);

                if (!res.data) {
                    return;
                }

                var posts = res.data;
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].message) {
                        if (posts[i].message.indexOf("#CIPP2017") > 0) {
                            InsertIfNotExist(posts[i].id);
                            pool.add(posts[i].id, db.collection("post_details"), measurement);
                        }
                    }
                }
            });
    }

    function InsertIfNotExist(id) {
        posts.find({ post_id: id }).count((err, count) => {
            error(err);

            if (count === 0) {
                posts.insertOne({ post_id: id });
                measurement.posts.numberOfPosts.increment();
                console.log(`post id : ${id} has been inserted`);
            }
        });
    }

    function initMeasurement() {
        posts.find().count((err, count) => {
            for(var i = 0 ; i < count ;i++){
                measurement.posts.numberOfPosts.increment();
            }
        });
    }

    initMeasurement();
    extendToken();
    fetchPost();
    setInterval(fetchPost, 60000);
    setInterval(extendToken, 3600000);

}
