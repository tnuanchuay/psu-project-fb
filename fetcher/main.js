module.exports = main

var graph = require("fbgraph");
var error = require("../utils/onerror");
var pool = require("./pool");
function main(config, db, measurement) {
    var posts = db.collection("posts");

    graph.setAccessToken(config.graphToken);

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
        graph.get("1834630993529478/posts?fields=message,id"
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
                            pool.add(posts[i].id, db.collection("post_details"));
                            measurement.posts.increment();
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
                console.log(`post id : ${id} has been inserted`);
            }
        });
    }
    
    extendToken();
    fetchPost();
    setInterval(fetchPost, 60000);
    setInterval(extendToken, 3600000);

}

