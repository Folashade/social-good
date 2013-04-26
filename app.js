// app.js
// Srinivasan Vijayaraghavan (srinivav@andrew.cmu.edu)

var techcafe = require('./node_modules/node_techcafe/node_techcafe');
var express = require('express');
var app = express();

app.use(express.bodyParser());

/* Code to fetch content from existing server
 * Provided by Sachin Hegde */

techcafe.getTeacherList(function(tList)  {
  console.log(tList);
});












var hostpath = "http://gentle-shore-9072.herokuapp.com/register";

/* Just fetching all levels of questions for now
 * First, fetch the questions object from existing server. 
 * Then, add a success attribute to it
 * Finally, send back the appended object to the client
 *
 * Note: Client sends a request to our server, which causes our server
 * to send a request to their server. Two requests and responses going on
 * at the same time here, one set is prefixed with client */
app.get('/all', function (clientRequest, clientResponse) {
  request(hostpath, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var questions = JSON.parse(body);
        questions.push({"success": "true"});
        clientResponse.send(questions);
      }
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
