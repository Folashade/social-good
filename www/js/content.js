/* content.js
 * Srinivasan Vijayaraghavan (srinivav)
 *
 * Used to fetch and handle content from server
 */

// For example, the callback can be a function which draws from the list

var teachers;
var contentList;
var content;


function loadTeachers(data) {
  window.teachers = [];
  for (var i=0; i < data.teacherList.length; i++)  {
    window.teachers.push(data.teacherList[i].username);
  }
}

function fetchTeachers(callbackFn) {
  $.ajax({
    type: "get", 
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
  localStorage["content"]=JSON.stringify(window.content);
}


function fetchByTeacher(teacherID, callbackFn)  {
  $.ajax({
    type: "get",
    url: "/teacher/" + teacherID + "",
    success: callbackFn
  });
}

