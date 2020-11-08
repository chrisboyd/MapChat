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

const BRAMPTON_BOUNDS = {
  north: 43.741833,
  south: 43.6914060,
  west: -79.800011,
  east: -79.702099,
};


const ORIGIN = { lat: 44.5413555555, lng: -77.3729861111 };

const contentString = "<img src='https://i.kym-cdn.com/entries/icons/original/000/025/155/stock.jpg'>";
//const contentString = '<button onclick="removeMarker()">Delete marker</button>';
/*-----------------------------------------------------------------------------------------------------*/

/*Reads the uploaded image, converts to a file, sets it as the source for an img for the marker content*/
// var rdr = new FileReader();
// var img = new Image(100, 100);



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

// window.setExif = function () {
//
// if(imgCounter > 0) {
// imgData.exifdata = null;
// }
// EXIF.getData(imgList[imgCounter], function() {
// imgData = imgList[imgCounter].exifdata;
// //  imgData = img.exifdata;
//   console.log(imgData);
// });
//
// }

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

/*This code is directly copied off the internet. May need to change it somehow.*/
// window.setCoords = function () {
//   console.log("Test");
//   var latDegree = imgData.GPSLatitude[0].numerator;
//   console.log("latDegree: " + latDegree);
//   var latMinute = imgData.GPSLatitude[1].numerator;
//     console.log("latMinute: " + latMinute);
//   var latSecond = imgData.GPSLatitude[2];
//     console.log("latSecond: " + latSecond);
//   var latDirection = imgData.GPSLatitudeRef;
//     console.log("latDirection: " + latDirection);
//
//   var lonDegree = imgData.GPSLongitude[0].numerator;
//   var lonMinute = imgData.GPSLongitude[1].numerator;
//   var lonSecond = imgData.GPSLongitude[2];
//   var lonDirection = imgData.GPSLongitudeRef;
//
//   var latFinal = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
//   var lonFinal = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
//
//   console.log("LAT: " + latFinal);
//     console.log("LONG: " + lonFinal);
//   testLat = latFinal;
//   testLong = lonFinal;
//
// }

function setCoords() {
  console.log("Test");
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

// window.addMarker = function() {
//
// var mark = new google.maps.Marker( {
// position: {lat: testLat, lng: testLong},
// map,
// title: "Test",
// });
//
// const iw = new google.maps.InfoWindow({
//    content: imgList[imgCounter],
//  });
//
//  mark.addListener("click", () => {
//    iw.open(map, mark);
//  });
//
// mark.setMap(map);
//
// // var image = document.getElementById('output');
// // image.src = URL.createObjectURL(event.target.files[0]);
// imgCounter++;
// document.getElementById('finput').value = '';
// console.log("got here");
// }

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

// var image = document.getElementById('output');
// image.src = URL.createObjectURL(event.target.files[0]);
imgCounter++;
document.getElementById('finput').value = '';
console.log("got here");
}

function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
map = new google.maps.Map(document.getElementById("map"), {
    center: ORIGIN,
    restriction: {
      latLngBounds: getBounds(44.541355555,-77.372986, 10),
      strictBounds: false,
    },
    disableDefaultUI: true,
    zoom: 15,
    styles: myStyles,
  });
}
