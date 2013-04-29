/* content.js
 * Srinivasan Vijayaraghavan (srinivav)
 *
 * Used to fetch and handle content from server
 */

// For example, the callback can be a function which draws from the list

var teachers;
var contentList;
var content;

//console.log(curQuestions[1]);

function loadTeachers(data) {
  window.teachers = data.teacherList;
  for (var i=0; i < window.teachers.length; i++)  {
    $("#t"+i).text(window.teachers[i].username);
  }
}

function fetchTeachers(callbackFn) {
  $.ajax({
    type: "get",  // read in cRud
    url: "/teachers",
    success: callbackFn
  });
}

function loadContent(data)  {
  window.content = data;
}


function fetchByTeacher(teacherID, callbackFn)  {
  $.ajax({
    type: "get",
    url: "teachers/" + teacherID + "",
    success: callbackFn
  });
}



var currentSet = {
        "name": "test set",
        "questions": [
          {
            "question": "___ you go.",
            "answers": [
              {
                "answer": "There",
                "correct": true
              },
              {
                "answer": "Their",
                "correct": false
              },
              {
                "answer": "They're",
                "correct": false
              },
              {
                "answer": "Thar",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T02:25:37Z",
              "id": 2,
              "name": "grammar",
              "updated_at": "2013-04-23T02:25:37Z"
            },
            "difficulty": 0
          },
          {
            "question": "I'm a new question.",
            "answers": [
              {
                "answer": "No",
                "correct": true
              },
              {
                "answer": "Yes",
                "correct": false
              },
              {
                "answer": "Maybe",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T02:25:52Z",
              "id": 4,
              "name": "reading",
              "updated_at": "2013-04-23T02:25:52Z"
            },
            "difficulty": 0
          },
          {
            "question": "If your friends answers. \"Yes, I can cook.\" What is the question you asked him?",
            "answers": [
              {
                "answer": "Should you cook?",
                "correct": false
              },
              {
                "answer": "Can you cook?",
                "correct": true
              },
              {
                "answer": "Why do you cook?",
                "correct": false
              },
              {
                "answer": "Can your wife cook?",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T02:25:37Z",
              "id": 2,
              "name": "grammar",
              "updated_at": "2013-04-23T02:25:37Z"
            },
            "difficulty": 0
          }
        ]
      }

var curQuestions = currentSet.questions;
