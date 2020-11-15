
var idList = [];
var mapIDList = [];
var buttonArray = [];
window.onload = function() {
  $.getJSON('https://cors-anywhere.herokuapp.com/http://ec2-3-219-234-245.compute-1.amazonaws.com:30004/', function(mapGroupList) {

console.log(mapGroupList);


var i;

for(i = 0; i < mapGroupList.length; i++) {
var button = document.createElement("button");
button.innerHTML = mapGroupList[i].name;
mapIDList.push(mapGroupList[i].map)
buttonArray.push(button);


console.log("mapgroup.html?id=" + mapGroupList[i].map);

document.getElementById("container").appendChild(button);
}

for(let j = 0; j < buttonArray.length; j++) {
let button = buttonArray[j];
button.addEventListener('click', function(){
  window.location.href = "mapgroup.html?id=" + mapIDList[j];
});

}


});

function testGo(id) {
  window.location.href = "mapgroup.html?id=" + id;
}



var id = 1;
var queryString = "?id=" + id;

var button = document.createElement("button");

button.onclick = function() {
  window.location.href = "mapgroup.html" + queryString;

}

var createMapGroupButton = document.getElementById("createMG");

createMapGroupButton.onclick  = function() {
  window.location.href = "mapgroupCreation.html";
}


}
