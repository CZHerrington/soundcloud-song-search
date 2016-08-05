import {clientID} from "./token.js";

var SC = require('soundcloud');


SC.initialize({
  client_id: clientID,
});
// Remember to gitignore/module out your client ID, and just import it as a module.

import $ from "jquery";

var trackList = null;


var template = function(tracks) {
  var title = tracks.title;
  var artist = tracks.user.username;
  var coverURL = tracks.artwork_url;
  var streamURL = tracks.stream_url;
  if (coverURL == null) {coverURL = "images/noart.png"};
  console.log("coverURL", coverURL, "stream: ", streamURL)
  return `<div class="track-result" data-stream="${streamURL}">
    <img id="track-img" src="${coverURL}"></img>
    <div class="track-info">
    <p><h3>${title}</h3></p>
    <hr>
    <p>by ${artist}</p>
    </div>
    </div>`
  };




var writeToPage = function(data) {
  $(".search-results").html("");
console.log("|writeToPage| Populating search results");
data.forEach(function(datum){
 $(".search-results").append(template(datum))
});
console.log("|writeToPage| Search results populated")
}
// Writes searched and fetched tracks to page by looping through a forEach loop
// after clearing the results <div>


var search = function(value){
SC.get('/tracks', {
  q: `"${value}"`,
  limit: '15'
}).then(function(tracks) {
  trackList = tracks
  console.log("|search| fetched tracks");
  console.log(trackList);
  writeToPage(trackList);
});
};
// This function searches Soundcloud for the value
// supplied and stores the results



function getTracks (term){
    console.log("|getTracks| getting tracks...")
    search(term)
};
// This function takes the value in the form and calls the search
// function




$('#searchbutton').click(function(){
  var form = document.getElementById('searchform');
  var searchTerm = form.value
  getTracks(searchTerm)
console.log('|Button Click Event|  ' + searchTerm)
});

// This sets an event listener on the search button and takes the value of the
// search form when the button is clicked


// test init
getTracks('1')
// test init

function success (data) {
  console.log( data )
};
function error (data) {
  console.log( data )
};

var audioTemplate = function (stream) {
return `<audio autoplay="true" controls="true" src="${stream}/?client_id=${clientID}">Browser doesnt support audio tag</audio>`
}


// $.ajax({
//   url: 'https://api.soundcloud.com/tracks/104738015/streams',
//   data: {client_id: clientID },
//   success: success,
//   error: error,
// });

$('#searchcontent').on('click', '.track-result', function(data)
{
    var stream = data.currentTarget.dataset.stream
  $(".audio-player").html(audioTemplate(stream))
    console.log('got it', data.currentTarget.dataset.stream)
});

 // https://api.soundcloud.com/tracks/104738015/streams?client_id=67201e5f48e40bf8d3aed22929bbd7e1
