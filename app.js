var http = require('http');
var express = require("express");
var app = express();

app.use(express.bodyParser());

/* Code to fetch content from existing server
 * Provided by Sachin Hegde */
var options = {"host": 'gentle-shore-9072.herokuapp.com', 
               "path": '/register', "method": 'GET'};

var callback = function(response) { 
  var str = ''; 
  response.on('data', function (chunk) {
    str += chunk; 
  });
  
  response.on('end', function () { 
    console.log(JSON.parse(str));
  });
};

http.request(options,callback).end();
