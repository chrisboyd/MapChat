// Initialize and add the map

let map = '';

var markers = [];
var our_map = null;
let myStyles =[
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
              { visibility: 'off' }
        ]
    }
];
var imgData = [];
var imgList = [];
//For testing exif data
var imgData = "";
var testLat = 0;
var testLong = 0;
var imgCounter = 0;
const KM_TO_DEGREE_LAT = 111;
const KM_TO_DEGREE_LONG = 111.3;

/*ORIGIN from user arguments.*/
// var originLatitude  = 44.5413555555;
// var originLongitude =  -77.3729861111;
// var originLatitude  = '';
// var originLongitude =  '';
// var range = '';

/*---------------------------*/
// window.onload = function() {
// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('id');
// const target = 'https://cors-anywhere.herokuapp.com/http://ec2-3-219-234-245.compute-1.amazonaws.com:30003/' + myParam;
//
//   $.getJSON(target, function(data) {
//
//     originLatitude = data.latitude;
//     originLongitude = data.longitude;
//
//     console.log(originLatitude);
//     console.log(originLongitude);
//
//   });
// }



const BRAMPTON_BOUNDS = {
  north: 43.741833,
  south: 43.6914060,
  west: -79.800011,
  east: -79.702099,
};

var lol = "";
const ORIGIN = { lat: 44.5413555555, lng: -77.3729861111 };

const contentString = "<img src='https://i.kym-cdn.com/entries/icons/original/000/025/155/stock.jpg'>";
//const contentString = '<button onclick="removeMarker()">Delete marker</button>';
/*-----------------------------------------------------------------------------------------------------*/


/*----------------------*/
// window.testFunc = function() {
//
// //  $.getJSON('https://cors-anywhere.herokuapp.com/http://ec2-3-219-234-245.compute-1.amazonaws.com:30003/', function(data) {
//       // JSON result in `data`
//
// originLatitude = $("#lat").val();
// originLongitude= $("#long").val();
//
// console.log(originLatitude);
// console.log(originLongitude);
//
// //this.action = "./index.html"
//
//
// //  });

/*----------------------*/

/*Reads the uploaded image, converts to a file, sets it as the source for an img for the marker content*/
// var rdr = new FileReader();
// var img = new Image(100, 100);

window.toDashboard = function () {
  window.location.href = "index.html";
}

window.setImage = function() {

  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    // convert image file to base64 string
    //img.src = reader.result;
    var nImage = new Image();
    nImage.src = reader.result;
    imgList.push(nImage);
  }, false);
  if (file) {
    reader.readAsDataURL(file);
  }

}


function setExif() {

if(imgCounter > 0) {
imgData.exifdata = null;
}
EXIF.getData(imgList[imgCounter], function() {
imgData = imgList[imgCounter].exifdata;
//  imgData = img.exifdata;
  console.log(imgData);
});

}

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + (minutes/60) + (seconds/3600);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    }
    return dd;
}

function setCoords() {
  var latDegree = imgData.GPSLatitude[0].numerator;
  console.log("latDegree: " + latDegree);
  var latMinute = imgData.GPSLatitude[1].numerator;
    console.log("latMinute: " + latMinute);
  var latSecond = imgData.GPSLatitude[2];
    console.log("latSecond: " + latSecond);
  var latDirection = imgData.GPSLatitudeRef;
    console.log("latDirection: " + latDirection);

  var lonDegree = imgData.GPSLongitude[0].numerator;
  var lonMinute = imgData.GPSLongitude[1].numerator;
  var lonSecond = imgData.GPSLongitude[2];
  var lonDirection = imgData.GPSLongitudeRef;

  var latFinal = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
  var lonFinal = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);

  console.log("LAT: " + latFinal);
    console.log("LONG: " + lonFinal);
  testLat = latFinal;
  testLong = lonFinal;

}

function getBounds(oLat, oLong, radiusKM) {
let degLat = radiusKM / (KM_TO_DEGREE_LAT);
let degLong = radiusKM / (KM_TO_DEGREE_LONG);

  return {
    north: oLat + (degLat / 2),
    south: oLat - (degLat / 2),
    west: oLong - (degLong / 2),
    east: oLong + (degLong / 2),
  };
}

window.removeMarker = function () {
  var mark = markers[0];
  google.maps.event.clearListeners(mark, 'click');
  mark.setMap(null);
}


window.addMarker = function() {
setExif();
setCoords();
var mark = new google.maps.Marker( {
position: {lat: testLat, lng: testLong},
map,
title: "Test",
});

const iw = new google.maps.InfoWindow({
   content: imgList[imgCounter],
 });

 mark.addListener("click", () => {
   iw.open(map, mark);
 });

mark.setMap(map);

imgCounter++;
document.getElementById('finput').value = '';
console.log("got here");
}

window.setOrigin = function() {
let bounds = getBounds(-24, 151, 1);
map.fitBounds(bounds);
map.setCenter({lat: -24, lng: 151});
}

var originLatitude = 0.0;
var originLongitude = 0.0;
var range = 0;
window.onload = function () {

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');
  const target = 'https://cors-anywhere.herokuapp.com/http://ec2-3-219-234-245.compute-1.amazonaws.com:30003/' + myParam;


    $.getJSON(target, function(data) {

      originLatitude = data.latitude;
      originLongitude = data.longitude;
      originRange = data.range;

      console.log("lat: " + originLatitude);
      console.log("long: " + originLongitude);
    initMap();
    });

}


function initMap() {
//44.5413555555
//-77.3729861111



var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: originLatitude, lng: originLongitude},
    restriction: {
      latLngBounds: getBounds(originLatitude, originLongitude, originRange),
      strictBounds: false,
    },
    disableDefaultUI: true,
    zoom: 15,
    styles: myStyles,
  });
}
