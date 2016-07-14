// 必要なモジュールをロードする
var http = require('http');
// var querystring = require('querystring');
// var crypto = require('crypto');

// http.Serverオブジェクトを作成する
var server = http.createServer();

var io = require("socket.io").listen(server);

var fs = require("fs");

server.on("request", function(req, res){
  var url = req.url;
  //console.log(url);
  //console.log(req.headers);
  
  if(url.match("/api"))
  {
    console.log("api access");
    io.sockets.on("connection",function(socket){//(2)
      console.log("connected");
      socket.on("send",function(send_data){//(4)クライアントからデータを受け取る
          console.log("receive send_data : " + send_data);
       socket.emit("pudh",send_data,function(data){//(5)本人に返す
          console.log("push : " + data);
        });
        socket.broadcast.emit("push","0.0");//(6)ほかの人に送信
      });
      socket.on("disconnected",function(){//(8)connectionおわり
        console.log("disconnected");
      });
    });
      // res.writeHead(200, {"Content-Type": "text/plain"});
      // res.write("api access");
      // console.log("api access");

      // return res.end();


  }else if(url === "/")
  {
    fs.readFile("index.html", "utf8", function(err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("not found!");
        console.log("cannot read index.html file");

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
        console.log("cannot read html file");

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
        // res.writeHead(404, {"Content-Type": "text/plain"});
        // res.write("not found!");
        // console.log("cannot read js file");

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
        console.log("cannot read jpg file");

        return res.end();
      }
      console.log("success read *JPG* file");
      res.writeHead(200,{'Content-Type': 'image/jpeg'});
      res.write(data);
      res.end();
    });
  }else{
      //console.log("cannot read **undefined** file");    
  }

});


// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';

// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');

