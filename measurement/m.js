var Prometheus = require('prometheus-client');
var client = new Prometheus();

var v = module.exports = {
    posts: client.newCounter({
        namespace:"psu_project",
        name:"post_count",
        help:"number of post count in facebook"
    }),

    test: client.newCounter({
        namespace:"psu_project",
        name:"test",
        help:"test"
    })
}

setInterval(function(){
    v.test.increment();
}, 1000);

client.listen(9095);