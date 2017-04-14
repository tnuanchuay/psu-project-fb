var pool = [];
var graph = require("fbgraph");
var error = require("../utils/onerror");
var config = require("../utils/config");

graph.setAccessToken(config.graphToken);
function postFetchById(id, posts) {
    return function () {
        graph.get(
            `${id}?fields=message,picture,reactions.type(LIKE).limit(0).summary(total_count).as(LIKE),reactions.type(LOVE).limit(0).summary(total_count).as(LOVE),reactions.type(WOW).limit(0).summary(total_count).as(WOW),reactions.type(HAHA).limit(0).summary(total_count).as(HAHA),reactions.type(SAD).limit(0).summary(total_count).as(SAD),reactions.type(ANGRY).limit(0).summary(total_count).as(ANGRY)`
            , function (err, data) {
                error(err);

                var postModel = {};
                postModel = {
                    id: data.id,
                    message: data.message,
                    picture: data.picture,
                    LIKE: data.LIKE.summary.total_count,
                    LOVE: data.LOVE.summary.total_count,
                    WOW: data.WOW.summary.total_count,
                    HAHA: data.HAHA.summary.total_count,
                    SAD: data.SAD.summary.total_count,
                    ANGRY: data.ANGRY.summary.total_count,
                }

                updatePost(posts, postModel);
            });
    }
}

function updatePost(repo, post) {
    repo.findAndModify({ id: post.id }, null, post, { upsert: true }, function (err) {
        error(err);
    });
}

function add(id, repo) {
    pool.push({ id: id, interval: setInterval(postFetchById(id, repo), 1000) });
    console.log(`${id} add to pool`);
}

module.exports = {
    add: add
}