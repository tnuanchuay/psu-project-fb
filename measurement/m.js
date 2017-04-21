var Prometheus = require('prometheus-client');
var client = new Prometheus();

var v = module.exports = {
    posts: {
        numberOfPosts: client.newCounter({
            namespace: "psu_project",
            name: "post_count",
            help: "number of post count in facebook"
        }),
        numberOfPostPools: client.newCounter({
            namespace: "psu_project",
            name: "post_fetcher_count",
            help: "number of post fetcher"
        }),
    },

    api: {
        numberOfRequest: client.newCounter({
            namespace: "psu_project",
            name: "api_request_per_sec",
            help: "api request/sec"
        }),
    },

    main: main
}

function main(db){
    var postDetail = db.collection("post_details");
    measureLike(postDetail);
    measureLove(postDetail);
    measureWow(postDetail);
    measureHaha(postDetail);
    measureShare(postDetail);
}

function measureShare(postDetail){
    var numberOfShare = client.newGauge({
        namespace: "psu_project",
        name: "share_count",
        help: "number of share"
    });

    setInterval(function(){
        postDetail.aggregate(
            [
                {
                    $group:
                    {
                        _id:"like_count",
                        count: {
                            $sum: "$SHARE"
                        }
                    }
                }
            ]).toArray(function(err, docs){
                if(err){
                    process.exit(0);
                }

                var count = docs[0].count;

                numberOfShare.set({
                    period: "10sec"
                }, count);
            });
        }, 10000);
}

function measureLove(postDetail){
    var numberOfLove = client.newGauge({
        namespace: "psu_project",
        name: "love_count",
        help: "number of love"
    });

    setInterval(function(){
        postDetail.aggregate(
            [
                {
                    $group:
                    {
                        _id:"like_count",
                        count: {
                            $sum: "$LOVE"
                        }
                    }
                }
            ]).toArray(function(err, docs){
                if(err){
                    process.exit(0);
                }

                var count = docs[0].count;

                numberOfLove.set({
                    period: "10sec"
                }, count);
            });
        }, 10000);
}

function measureWow(postDetail){
    var numberOfWow = client.newGauge({
        namespace: "psu_project",
        name: "wow_count",
        help: "number of wow"
    });

    setInterval(function(){
        postDetail.aggregate(
            [
                {
                    $group:
                    {
                        _id:"like_count",
                        count: {
                            $sum: "$WOW"
                        }
                    }
                }
            ]).toArray(function(err, docs){
                if(err){
                    process.exit(0);
                }

                var count = docs[0].count;

                numberOfWow.set({
                    period: "10sec"
                }, count);
            });
        }, 10000);
}

function measureHaha(postDetail){
    var numberOfHaha = client.newGauge({
        namespace: "psu_project",
        name: "haha_count",
        help: "number of haha"
    });

    setInterval(function(){
        postDetail.aggregate(
            [
                {
                    $group:
                    {
                        _id:"like_count",
                        count: {
                            $sum: "$HAHA"
                        }
                    }
                }
            ]).toArray(function(err, docs){
                if(err){
                    process.exit(0);
                }

                var count = docs[0].count;

                numberOfHaha.set({
                    period: "10sec"
                }, count);
            });
        }, 10000);
}

function measureLike(postDetail){
    var numberOfLike = client.newGauge({
        namespace: "psu_project",
        name: "like_count",
        help: "number of like"
    });

    setInterval(function(){
        postDetail.aggregate(
            [
                {
                    $group:
                    {
                        _id:"like_count",
                        count: {
                            $sum: "$LIKE"
                        }
                    }
                }
            ]).toArray(function(err, docs){
                if(err){
                    process.exit(0);
                }

                var count = docs[0].count;

                numberOfLike.set({
                    period: "10sec"
                }, count);
            });
        }, 10000);
}


client.listen(9095);
