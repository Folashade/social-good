/* content.js
 * Srinivasan Vijayaraghavan (srinivav)
 *
 * Used to fetch and handle content from server
 */

// For example, the callback can be a function which draws from the list


function get() {
  $.ajax({
    type: "get",  // read in cRud
    url: "/teachers",
    success: function(data) {
      console.log(JSON.stringify(data));
    }
  });
}

/*
function fetchTeacherList() {
  $.ajax({
    type: "get",
    url: "/teachers",
    success: function(data) {
      console.log(data);
    }
  });
}
*/


/*
  // Implement the get() function
  function get() {
    $.ajax({
      type: "get",
      url: "/listings",
      success: function(data) {
        listings = data.listings;
        //console.log(listings);
        refreshDOM();
      }
    });
  }
*/
