var http = require('http');
let apiKey = '12f515523a9c9d0171008023043938aa';
let city = 'portland';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=New+Delhi,In&appid=12f515523a9c9d0171008023043938aa'
var server = http.createServer(function (request,response){
var request = require('request');
request(url, function(err,res,body){
console.log(body);
var data = JSON.parse(body);
response.write("<html><body><div id='container'>");
response.write("<h1>" + 'City Name - ' +  data['name'] + '<br>' + "</h1>");
response.write("<h2>" + 'Temprature - ' +  data.main['temp'] + '<br>' + "</h2>");
response.write("<h2>" + 'Sunset Time - ' +  new Date(data.sys['sunset'] * 1000) + '<br>' + "</h2>");
response.write("</div></body></html>");
response.end();
});
}).listen(8080);


