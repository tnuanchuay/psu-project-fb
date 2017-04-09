var graph = require('fbgraph');
var config = require("./config");

graph.setAccessToken(config.graphToken);
function extendToken(){
	graph.extendAccessToken({
		"client_id":      config.clientId,
		"client_secret":  config.secret
	}, function (err, res) {
		if(err)
			return;

		if(res.message){
			console.log(res.message)
		}else{
			graph.setAccessToken(res.access_token);
		}
	});
}

function fetchPost(){
	graph.get("1834630993529478?fields=posts"
	, function(err, res){
		if(err){
			return;
		}

		if(!res.posts){
			return;
		}

		var posts = res.posts.data;
		for(var i = 0 ; i < posts.length ;i++){
			console.log(posts[i].id);
		}
	});
}

fetchPost();

setTimeout(()=>setInterval(extendToken, 3600), 3600);
