let http = require('http');
let util = require('util');

http.get('http://www.imooc.com/u/card', (res) => {
  let cardData = '';
  res.on("data", (chunk) => {
    cardData += chunk;
  })
  res.on("end", () => {
    console.log(cardData);
    // let result = JSON.parse(cardData);
    // console.log(util.inspect(result));
  }).on("error", (e) => {
    console.log(e);
  })
});
