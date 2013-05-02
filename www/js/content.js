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
  window.teachers = [];
  for (var i=0; i < data.teacherList.length; i++)  {
    window.teachers.push(data.teacherList[i].username);
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
  window.contentList = [];

  for (var i = 0; i < window.content.content.content_sets.length; i++)  {
    window.contentList.push(window.content.content.content_sets[i].name);
  }
}


function fetchByTeacher(teacherID, callbackFn)  {
  $.ajax({
    type: "get",
    url: "/teacher/" + teacherID + "",
    success: callbackFn
  });
}


var currentSet =   {
        "name": "english-easy",
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
            "question": "Where ___ my brother?",
            "answers": [
              {
                "answer": "are",
                "correct": false
              },
              {
                "answer": "am",
                "correct": false
              },
              {
                "answer": "is",
                "correct": true
              },
              {
                "answer": "how",
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
            "question": "I went home and ____ games.",
            "answers": [
              {
                "answer": "play",
                "correct": false
              },
              {
                "answer": "played",
                "correct": true
              },
              {
                "answer": "player",
                "correct": false
              },
              {
                "answer": "playing",
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
            "question": "When ___ you leaving?",
            "answers": [
              {
                "answer": "is",
                "correct": false
              },
              {
                "answer": "was",
                "correct": false
              },
              {
                "answer": "that",
                "correct": false
              },
              {
                "answer": "are",
                "correct": true
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
            "question": "When ___ we be there?",
            "answers": [
              {
                "answer": "will",
                "correct": true
              },
              {
                "answer": "are",
                "correct": false
              },
              {
                "answer": "am",
                "correct": false
              },
              {
                "answer": "was",
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
            "question": "He ____ to eat pizza.",
            "answers": [
              {
                "answer": "like",
                "correct": false
              },
              {
                "answer": "likes",
                "correct": true
              },
              {
                "answer": "liker",
                "correct": false
              },
              {
                "answer": "liking",
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
            "question": "Now I am ____ better.",
            "answers": [
              {
                "answer": "play",
                "correct": false
              },
              {
                "answer": "player",
                "correct": false
              },
              {
                "answer": "playing",
                "correct": true
              },
              {
                "answer": "played",
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
            "question": "He is really good ___ chess.",
            "answers": [
              {
                "answer": "for",
                "correct": false
              },
              {
                "answer": "to",
                "correct": false
              },
              {
                "answer": "win",
                "correct": false
              },
              {
                "answer": "at",
                "correct": true
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
            "question": "Why did he ___ there?",
            "answers": [
              {
                "answer": "was",
                "correct": false
              },
              {
                "answer": "goes",
                "correct": false
              },
              {
                "answer": "went",
                "correct": false
              },
              {
                "answer": "go",
                "correct": true
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
            "question": "____ is the best game ever.",
            "answers": [
              {
                "answer": "This",
                "correct": true
              },
              {
                "answer": "Those",
                "correct": false
              },
              {
                "answer": "These",
                "correct": false
              },
              {
                "answer": "Thou",
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
            "question": "I ___ you about the test!",
            "answers": [
              {
                "answer": "tolled",
                "correct": false
              },
              {
                "answer": "toled",
                "correct": false
              },
              {
                "answer": "tolwd",
                "correct": false
              },
              {
                "answer": "told",
                "correct": true
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "I have ____ that movie.",
            "answers": [
              {
                "answer": "sein",
                "correct": false
              },
              {
                "answer": "scene",
                "correct": false
              },
              {
                "answer": "ceen",
                "correct": false
              },
              {
                "answer": "seen",
                "correct": true
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "One more than nineteen is ______.",
            "answers": [
              {
                "answer": "Twentie",
                "correct": false
              },
              {
                "answer": "Twenty",
                "correct": true
              },
              {
                "answer": "Tuenti",
                "correct": false
              },
              {
                "answer": "Tuente",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "I am _____ to go!",
            "answers": [
              {
                "answer": "reddy",
                "correct": false
              },
              {
                "answer": "readie",
                "correct": false
              },
              {
                "answer": "redy",
                "correct": false
              },
              {
                "answer": "ready",
                "correct": true
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "What a nice looking _____.",
            "answers": [
              {
                "answer": "harecut",
                "correct": false
              },
              {
                "answer": "herecut",
                "correct": false
              },
              {
                "answer": "hairkutt",
                "correct": false
              },
              {
                "answer": "haircut",
                "correct": true
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "That is even better than _____.",
            "answers": [
              {
                "answer": "monie",
                "correct": false
              },
              {
                "answer": "monny",
                "correct": false
              },
              {
                "answer": "mone",
                "correct": false
              },
              {
                "answer": "money",
                "correct": true
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "Can you take our _____?",
            "answers": [
              {
                "answer": "pictur",
                "correct": false
              },
              {
                "answer": "picture",
                "correct": true
              },
              {
                "answer": "pickchur",
                "correct": false
              },
              {
                "answer": "pickture",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "The festival is ____.",
            "answers": [
              {
                "answer": "neer",
                "correct": false
              },
              {
                "answer": "nier",
                "correct": false
              },
              {
                "answer": "near",
                "correct": true
              },
              {
                "answer": "nir",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "That can wait until next ___.",
            "answers": [
              {
                "answer": "year",
                "correct": true
              },
              {
                "answer": "yeer",
                "correct": false
              },
              {
                "answer": "yir",
                "correct": false
              },
              {
                "answer": "yiir",
                "correct": false
              }
            ],
            "category": {
              "created_at": "2013-04-23T22:33:12Z",
              "id": 5,
              "name": "spelling",
              "updated_at": "2013-04-23T22:33:12Z"
            },
            "difficulty": 0
          },
          {
            "question": "Can I please have ___ cookie?",
            "answers": [
              {
                "answer": "one",
                "correct": true
              },
              {
                "answer": "won",
                "correct": false
              },
              {
                "answer": "on",
                "correct": false
              },
              {
                "answer": "une",
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
     };

var curQuestions = currentSet.questions;
