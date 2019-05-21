var request = require('request');
var convert = require('xml-js');

request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function(error, response, body){
    //var statusCode = convert.xml2json(response, {compact:true,spaces:4});
    var bodyCode = convert.xml2json(body,{compact:false,spaces:4});
    console.log(error);
    console.log(bodyCode.rss.channel);
});
