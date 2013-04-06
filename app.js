// app.js
// Srinivasan Vijayaraghavan (srinivav@andrew.cmu.edu)

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
    return JSON.parse(str);
  });
};


console.log(http.request(options, callback).end());


/* Just fetching all levels of questions for now
 * First, fetch the questions object from existing server. 
 * Then, add a success attribute to it
 * Finally, send back the appended object to the client
 */
app.get('/all', function (request, response) {
  var allQuestions = http.request(options, callback).end();
  allQuestions.push({"success": "true"});
  response.send(allQuestions);

});


/* Rest of the code is from lecture notes 
 */

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

// Finally, activate the server at port 8889
// app.listen(8889);




