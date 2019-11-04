let http = require('http');
let url = require('url');

//util模块用于调试，可将对象转为字符串，例如将url的个个key：value值变为字符串，这样就可以清晰知道请求参数
let util = require('util');

let fs = require('fs');

let server = http.createServer((req, res) => {

  let pathName = url.parse(req.url).pathname
  fs.readFile(pathName.substring(1), (err, data) => {
    if(err){
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
      res.write("404NotFound");
    }else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      res.write(data.toString());
    }
    res.end();
  })
});

server.listen(3000, '127.0.0.1', () => {
  console.log("success");
})
