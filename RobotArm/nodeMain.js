// 必要なモジュールをロードする
var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

// http.Serverオブジェクトを作成する
var server = http.createServer();

var fs = require("fs");

server.on("request", function(req, res){
  var url = req.url;
  console.log(url);
  console.log(req.headers);
  
  if(url === "/api")
  {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("api access");
      console.log("api access");

      return res.end();

  }else if(url === "/")
  {
    fs.readFile("index.html", "utf8", function(err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("not found!");
        console.log("cannot read file");

        return res.end();
      }
      console.log("success read *index.html* file");
      res.writeHead(200,{"Content-Type" : "text/html"});
      res.write(data);
      res.end();
    });
  }else if(url.match(".html")){
    fs.readFile("." + url, "utf8", function(err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("not found!");
        console.log("cannot read file");

        return res.end();
      }
      console.log("success read *HTML* file");
      res.writeHead(200,{"Content-Type" : "text/html"});
      res.write(data);
      res.end();
    });
  }else if(url.match(".js")){
    fs.readFile("." + url, "utf8", function(err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("not found!");
        console.log("cannot read file");

        return res.end();
      }
      console.log("success read *JS* file");
      res.writeHead(200,{"Content-Type" : "text/plain"});
      res.write(data);
      res.end();
    });
  }else if(url.match(".jpg")){
    fs.readFile("." + url, function(err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("not found!");
        console.log("cannot read file");

        return res.end();
      }
      console.log("success read *JPG* file");
      res.writeHead(200,{'Content-Type': 'image/jpeg'});
      res.write(data);
      res.end();
    });
  }

});


// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';

// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');

