/* content.js
 * Srinivasan Vijayaraghavan (srinivav)
 *
 * Used to fetch and handle content from server
 */

// For example, the callback can be a function which draws from the list
function getTeacherList(callback) {
  $.ajax({type: "get",
          url: "/teachers",
          success: callback(data);
         });
}

