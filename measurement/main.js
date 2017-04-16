var Prometheus = require('prometheus-client');
var client = new Prometheus();

module.exports = {
    posts: client.newCounter({
        namespace:"psu-project",
        name:"post_count",
        help:"number of post count in facebook"
    })
}

client.listen(9095);