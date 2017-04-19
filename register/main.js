var ifttt = require("iftttmaker")("3ZxGpya4UVbwPd836Kf_p");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

app.post("/post", function(req, res){
	var stdId = checkEmpty(req.body.stdId);
	var	fullname = checkEmpty(req.body.fullname);
	var fbtag = checkEmpty(req.body.fbtag);
	var faculty = checkEmpty(req.body.faculty);
	var pjname = checkEmpty(req.body.pjname);
	var youtubeLink = checkEmpty(req.body.link);

	if(fbtag.indexOf(",") > 0){
		var tags = fbtag.split(",");
		fbtag = ""
		for(var i = 0 ; i < tags.length ; i++){
				fbtag += `www.facebook.com/${tags[i].trim()} `;
		}
	}else{
		fbtag = `www.facebook.com/${fbtag}`;
	}

	var postbody = `${stdId} ${fullname} (${fbtag}) ${faculty}<br>`;
	var pjandHashtag = `โครงงาน: ${pjname} #CIPP2017<br>`

	ifttt.send('project', youtubeLink, postbody, pjandHashtag)
	.then(function(){
		res.redirect("https://www.facebook.com/pg/cipp2017/posts");
	})
	.catch(function(err){
		res.end(err);
	})
});

function checkEmpty(v){
	return (v.length > 0) ? v : "";
}

app.listen(9000);
