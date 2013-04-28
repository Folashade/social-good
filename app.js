// app.js
// Srinivasan Vijayaraghavan (srinivav@andrew.cmu.edu)

/* Routes:
 * /teachers returns a list of teachers
 * /teacher/teacherID returns the content set for that teacherID 
 *
 * Fetching content set data using the TechCaFE API, documented at
 * http://www.cs.cmu.edu/~239/projects/techcafe-games/apidoc.html
 */

var techcafe = require('./node_modules/node_techcafe/node_techcafe');
var express = require('express');
var app = express();

app.use(express.bodyParser());

/* Route to fetch teacher list. Callback responds to the client */
app.get('/teachers', function(clientRequest, clientResponse)  {
  techcafe.getTeacherList(function(tList) {
    clientResponse.send({
      "teacherList": tList,
      "success": true
    });
  });
});

/* Route to fetch content by teacher */
app.get("/teacher/:teacherID", function(clientRequest, clientResponse)  {
  var teacherID = clientRequest.params.teacherID;
//  console.log(teacherID);
  techcafe.getContentByTeacher(teacherID, function(content) {
    clientResponse.send({
      "content": content,
      "success": true
    });
  });
});



/* Rest of the code is from lecture notes */

// This is for serving files in the static directory
// assets, css, fonts, game, js
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

app.get("/static/assets/:staticFilename", function (request, response) {
    response.sendfile("static/assets/" + request.params.staticFilename);
});


app.get("/static/css/:staticFilename", function (request, response) {
    response.sendfile("static/css/" + request.params.staticFilename);
});


app.get("/static/fonts/:staticFilename", function (request, response) {
    response.sendfile("static/fonts/" + request.params.staticFilename);
});

app.get("/static/game/:staticFilename", function (request, response) {
    response.sendfile("static/game/" + request.params.staticFilename);
});


app.get("/static/js/:staticFilename", function (request, response) {
    response.sendfile("static/js/" + request.params.staticFilename);
});



// Finally, activate the server at port 8889
app.listen(8889);
