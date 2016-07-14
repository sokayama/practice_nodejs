// 必要なモジュールをロードする
var http = require('http');
// var querystring = require('querystring');
// var crypto = require('crypto');

// http.Serverオブジェクトを作成する
var server = http.createServer();

var io = require("socket.io")(server);
//タイムアウトを5秒に設定する
io.set('heartbeat timeout',5000);
io.set('heartbeat interval',5000);

var guestdata_list = [];
var guestdata=0;

var push_data = 0;
// io.sockets.on("connection",function(socket){//
io.on("connection",function(socket){//

//接続しているクライアント情報取得    
  socket.on("disconnected",function(){
    console.log("disconectttttt");
  })
  console.log("[" + socket.handshake.address + "] is connected");
  guestdata_list.push(socket.handshake.address);//接続者リスト（arrayだけど）をつくる
  guestdata = socket.handshake.address;

  socket.emit("push_guest_list",guestdata_list);//接続者リストを送る
  socket.broadcast.emit("push_guest_list",guestdata_list);//接続者リストを送る

  socket.emit("push_guest",guestdata);//あなたのIP教えます
  
  socket.on("user_disconnected",function(data){//ディスコネしたの誰？
    console.log("[" + data + "] is disconnected");
    for(var i =0;i<guestdata_list.length;i++){
        console.log(typeof data);
        if(guestdata_list[i] === data){
          console.log("[" + data + "] is deleted");
          guestdata_list.splice(i,1);
          break;//同じIPが二人以上いたら全部消さないように
       }
    }
    console.log("帰っていきます")
    socket.broadcast.emit("push_guest_list",guestdata_list);//接続者リストを送る
     
  });


  socket.on("send1",function(send_data){//クライアントから受信
    console.log("recerive send_data : "+ send_data);
    push_data = send_data;

    socket.emit("push1",push_data);
    socket.broadcast.emit("push1",push_data);
  });
  socket.on("send10",function(send_data){//クライアントから受信
    console.log("recerive send_data : "+ send_data);
    push_data = send_data;

    socket.emit("push10",push_data);
    socket.broadcast.emit("push10",push_data);
  });
  socket.on("send2",function(send_data){//クライアントから受信
    console.log("recerive send_data : "+ send_data)
    push_data = send_data;

    socket.emit("push2",push_data);
    socket.broadcast.emit("push2",push_data);
  });
  socket.on("send20",function(send_data){//クライアントから受信
    console.log("recerive send_data : "+ send_data);
    push_data = send_data;

    socket.emit("push20",push_data);
    socket.broadcast.emit("push20",push_data);
  });
});



var fs = require("fs");

server.on("request", function(req, res){
  var url = req.url;
  //console.log(url);
  //console.log(req.headers);


  if(url.match("/api")){
    console.log("api access");
      // res.writeHead(200, {"Content-Type": "text/plain"});
      // res.write("api access");
      // console.log("api access");

      // return res.end();


  }else if(url === "/"){
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

