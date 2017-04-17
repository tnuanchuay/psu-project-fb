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
        })
    },

    api: {
        numberOfRequest: client.newCounter({
            namespace: "psu_project",
            name: "api_request_per_sec",
            help: "api request/sec"
        }),
    }
}

client.listen(9095);