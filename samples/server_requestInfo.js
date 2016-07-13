//httpモジュールの読み込み
var http = require("http");

//http.Serverクラスのインスタンス
var server = http.createServer();

//requestイベントハンドラの定義
server.on("request", function(request,response){

    console.log(request.url);//requestのログを吐く
    
    //response.writeHead(200,{"Content-type": "text/plain"});//httpレスポンスヘッダを出力
    response.writeHead(200);//httpレスポンスヘッダを出力

    response.write("URL: " + request.url + "\n");
    response.write("Method: " + request.method + "\n");

    Object.keys(request.headers).forEach(function (key){
        response.write(key + ": " + request.headers[key] + "\n");
    });    

    response.end();

});


//port8080で待ち受け開始
server.listen(8080,"localhost");