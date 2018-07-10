var ex = require('express')
var app = ex();
app.listen(3000, () => console.log('[BotEngine] Webhook is listening'));
app.post('/webhook', function(req,res){

if(!req.body) return res.sendStatus(400);
res.setHeader('Content-Type', 'application/JSON');
console.log('Request from Dialog Flow');
console.log(req.body);
var city = req.body.queryResult.parameters('geo-city');
var w = getWeather(city);
let response = " ";
let responseObj = { 
    "fulfillmentText":response,
    "fulfillmentMessages":[{"text" : {"text" : {w}}}],
    "source":""
}
return res.json(responseObj);

})

var apikey = '12f515523a9c9d0171008023043938aa';
var result;

function cb (err, response, body){
    if(err)
    {
        consolde.log('error:', error);
    }
    var weather = JSON.parse(body);
    if (weather.message == 'city not found')
    {
        result = 'Unable to provide the weather info' + weather.message;
    }
    else
    {
        result = 'Right now the weather is ' + weather.main.temp + ' degrees with ' + weather.weather[0].description;
    }
 
}

function getWeather(city)
{
    var result = undefined;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=$(city)&units=imperial&appid=$(apikey)';
    console.log(url);
    var req = request(url, cb );
    while (result == undefined)
    {
        require('deasync').runLoopOnce();
    }
    return result;
}

