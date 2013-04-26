// app.js
// Srinivasan Vijayaraghavan (srinivav@andrew.cmu.edu)

// Fetching content set data using the TechCaFE API, documented at
// http://www.cs.cmu.edu/~239/projects/techcafe-games/apidoc.html

var techcafe = require('./node_modules/node_techcafe/node_techcafe');
var express = require('express');
var app = express();

app.use(express.bodyParser());


techcafe.getTeacherList(function(tList)  {
  console.log(tList);
});


techcafe.getContentByTeacher('teacher1', function(content) {
  console.log(content);
});


/* Route to fetch teacher list */
app.get('/teachers', function(clientRequest, clientResponse)  {
  techcafe.getTeacherList(function(tList) {
    tList.push({"success": "true"});
    clientResponse.send(tList);
  });
});


/* 
app.get('/all', function (clientRequest, clientResponse) {
  request(hostpath, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var questions = JSON.parse(body);
        questions.push({"success": "true"});
        clientResponse.send(questions);
      }
  });
});
*/


/* Rest of the code is from lecture notes 
 */

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

// Finally, activate the server at port 8889
app.listen(8889);
