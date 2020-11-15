




//http://ec2-3-219-234-245.compute-1.amazonaws.com:30004/
//http://ec2-3-219-234-245.compute-1.amazonaws.com:30004/

function sendData() {

const mapServiceTarget = 'https://cors-anywhere.herokuapp.com/http://ec2-3-219-234-245.compute-1.amazonaws.com:30003/';
const mapGroupServiceTarget = 'https://cors-anywhere.herokuapp.com/http://ec2-3-219-234-245.compute-1.amazonaws.com:30004/';


// var mapData = {
//      "longitude": 11,
//      "latitude": 12,
//      "range": 10
// };

var mgName = document.getElementById("mgName").value;
var lat = document.getElementById("lat").value;
var long = document.getElementById("long").value;
var range = document.getElementById("range").value;

var mapString = "{\"longitude\":" + long + ",\"latitude\":" + lat + ",\"range\":" + range + "}";
var mapGroupString = "{\"name\":" + mgName + ",\"members\":\"1,2\"" + ",\"mapId\":" + range + "}";

// "longitude": 17,
// "latitude": 14,
//  "Range": 15

/*-------------------------THIS FUCKING WORKS*/

// var newMapID = 0;
// $.ajax( {
// type: "POST",
// url: mapServiceTarget,
// data: JSON.stringify({
//       "longitude": 133,
//       "latitude": 133,
//        "range": 1
// }),
// contentType: "application/json",
// success: function(response) {
//   newMapID = response.id;
//   console.log("Map ID returned: " + newMapID);
//
//   $.ajax( {
//   type: "POST",
//   url: mapGroupServiceTarget,
//   data: JSON.stringify({
//         "name": "New test",
//         "members": "1,2",
//          "mapId": newMapID
//   }),
//   contentType: "application/json",
//   success: function(response) {
//     console.log("Completed");
// //   window.location.href = "index.html";
//   }
//
//   });
//
// }
//
// });



var newMapID = 0;
$.ajax( {
type: "POST",
url: mapServiceTarget,
// data: JSON.stringify({
//       "longitude": 17,
//       "latitude": 14,
//        "Range": range
// }),
data: mapString,
contentType: "application/json",
success: function(response) {
  newMapID = response.id;
  console.log("Map ID returned: " + newMapID);
var mapGroupString = "{\"name\":\"" + mgName + "\",\"members\":\"1,2\"" + ",\"mapId\":" + newMapID + "}";
  $.ajax( {
  type: "POST",
  url: mapGroupServiceTarget,
  // data: JSON.stringify({
  //       "name": "testLat26343ww5",
  //       "members": "1,2",
  //        "mapId": newMapID
  // }),
  data: mapGroupString,
  contentType: "application/json",
  success: function(response) {
    console.log("Completed");
    window.location.href = "index.html";
//   window.location.href = "index.html";
  }

  });

}

});


/*------------------------------------------*/



}


window.onload = function() {


//Function that commits the information
//sendData();
}

window.createMapGroup = function () {

 sendData();
//var test = "waaaa";
var mgName = document.getElementById("mgName").value;
var lat = document.getElementById("lat").value;
var long = document.getElementById("long").value;
var range = document.getElementById("range").value;

var testString = "{\"longitude\":" + long + ",\"latitude\":" + lat + ",\"range\":" + range + "}";
console.log(testString);



}


// {
// "createdAt": "2020-11-12T00:40:55.222+00:00",
// "updatedAt": "2020-11-12T00:40:55.222+00:00",
// "id": 1,
// "name": "White Council",
// "members": 1234,
// "map": 1
// }
