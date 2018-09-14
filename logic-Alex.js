
var date1 = "";
var date2 = "";
var latitude = "";
var longitude = "";

// console.log(localInput);

function dateRangePicker () {
    $('.daterange').daterangepicker({
    opens: 'left'
    }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    date1 = start.format('YYYY-MM-DD');
    date2 = end.format('YYYY-MM-DD');
    });
};
dateRangePicker();

$("#add-movie").on("click", function(event) {
    event.preventDefault();

    $(".results").empty();
    // This line of code will grab the input from the textbox

var states = $("#states");
var artistInput = $("#artist-input").val().trim();
var localInput = $('#states :selected').val();

    // var localInput =  statesDropdown.option[statesDropdown.selectedIndex].value;

console.log(states);



// var artistInput = "Beyonce";


// var localInput = $("#location-input").val().trim();
// var artistInput = $("#artist-input").val();
console.log(localInput, artistInput);

// var date = "2018-08-02T23:30:00";
// 08-03-2018 + "&datetime_utc=" + date


$.ajax({
url: "https://api.seatgeek.com/2/events?performers.slug=" + artistInput + "&client_id=MTI0MDkxMTB8MTUzMjU2NjgxOS44NA&venue.state=" + localInput + "&datetime_utc.gte=" + date1 + "&datetime_utc.lte=" + date2,
method: "GET"
}).then(function(response) {
  var refined = response.events;
  console.log(refined);


        // Looping through the array of movies
        for (var i = 0; i < refined.length; i++) {
          var images = refined[i].performers[0].image;
          var event = refined[i];
          var originalDateFormat = event.datetime_local;
          var dateTime = originalDateFormat.split("T");
          var date = dateTime[0];
          var time = dateTime[1];
          var momentTime = moment(time, "hhmm").format("hh:mm a");
          var momentDate = moment(date,"YYYYY-MM-DD").format("LL");
          latitude = event.venue.location.lat;
          longitude = event.venue.location.lon;
          console.log(latitude, longitude);
        //   console.log(momentTime);
        //   console.log(momentDate);
        //   console.log(date);
        //   console.log(date, time);
        console.log(event);

          if (images === null){
            images = "http://www.so-events.at/SYSTEM/image_background/standard/background_02.jpg"}

        // $(".description").append( "<h1>" + event.title + " " + event.type + "</h1>")
        // $(".description").append( '<img id="theImg" src="'+images+'" alt = "http://www.so-events.at/SYSTEM/image_background/standard/background_02.jpg"/>');
               // $(".description").append( "<div>" + momentDate + " at " + momentTime + "</div>");
               // $(".description").append( "<div>" + event.venue.address + "</div>")
               // event.type +

               $(".results").append( "<div class = card id = eventCards>" + "<h3 id = cheader>" + event.title + " " + "</h3>" + '<img id="theImg" src="'+images+'" alt = "http://www.so-events.at/SYSTEM/image_background/standard/background_02.jpg"/>' + '<br>' + '<p class = infor>' + momentDate + " at " + momentTime + '<br>' + "Address: " + event.venue.address + '</p>' + '<br>' + "<button type='button' class='btn btn-info' id='hotel-btn' latitude='" + latitude + "' longitude='" + longitude + "'>Hotels</button>" +  "</div>")
            }
  });
 });

var map;
var service;
var infowindow;
var hotels;

function initialize() {
    var lat = this.getAttribute("latitude");
    var long = this.getAttribute("longitude");
    console.log(lat, long);
    console.log(this);
    
    //console.log($("#hotel-btn").getAttribute("latitude"));
    var longlat = new google.maps.LatLng(lat,long);
  //var longlat = {Lat: latitude, Lng: longitude};
  
  //var longlat = new google.maps.LatLng(-33.8665433,151.1956316);
  //var longlat = {Lat: 40.9749, Lng:-72.1423};

  map = new google.maps.Map(document.getElementById('map'), {
    center: longlat,
    zoom: 15
  });

  var request = {
    location: longlat,
    radius: '24140.2',
    type: ['lodging']
  };
   
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      hotels = results[i];
      createMarker(hotels);
      console.log(hotels);
      console.log(hotels.name);
      console.log(hotels.vicinity);
      console.log(hotels.photos);
      console.log(hotels.rating);
      $(".row-hotel").append( "<div class =card id=hotelcard>" + "<h1 id= hotelcardHead>" + hotels.name + " " + "</h1>" + '<br>' + hotels.vicinity + '<br>' + '<br>' + "Hotel Rating: " + hotels.rating + "</div>")
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  

  var contentString =  "<div id='infoWrap'><h1>" + hotels.name + "</h1>" + hotels.vicinity + '<br>' + hotels.rating  + "</div>";
  var infowindow = new google.maps.InfoWindow({
    content: '<div style="height:200px; width: 800px;">'+ contentString+'</div>',
  });
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    info: infowindow,
    content: contentString,
  });

  google.maps.event.addListener(marker, 'click', function() {

    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

$(document).on("click", "#hotel-btn", initialize);
//google.maps.event.addDomListener(window, "load", initialize);

//initialize()

