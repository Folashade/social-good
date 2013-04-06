// app.js
// Srinivasan Vijayaraghavan (srinivav@andrew.cmu.edu)

var request = require('request');
var express = require('express');
var app = express();

app.use(express.bodyParser());

/* Code to fetch content from existing server
 * Provided by Sachin Hegde */

var hostpath = "http://gentle-shore-9072.herokuapp.com/register";

var reqCallback = function(error, response, body)  {
  if (!error && response.statusCode == 200) {
    var questions = JSON.parse(body);
    questions.push({"success": "true"});
    return questions;
  }
}

// request(hostpath, reqCallback);

  
/* Just fetching all levels of questions for now
 * First, fetch the questions object from existing server. 
 * Then, add a success attribute to it
 * Finally, send back the appended object to the client
 */
app.get('/all', function (clientRequest, clientResponse) {
  request(hostpath, function(error, response, body) {
    var allQuestions = reqCallback(error, response, body);
    clientResponse.send(allQuestions);
  });
});


/* Rest of the code is from lecture notes 
 */

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

// Finally, activate the server at port 8889
 app.listen(8889);


