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
  return `<div class="track-result">
    <img id="track-img" src="${coverURL}"></img>
    <div class="track-info">
    <p><h3>${title}</h3></p>
    <hr>
    <p>by ${artist}</p>
    </div>
    </div>`
  };


// SHOULD BE TESTED MORE ^^^
// var trackTemplate = function(objs){
// debugger;
//   var title = objs.title;
//   var artist = objs.user.username;
//   var coverURL = objs.artwork_url;
//   var streamURL = objs.stream_url;
//   return "Blahhhh"
// }



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
  limit: '16'
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

$('#track-img').click(function(){
console.log('poke')
});

// test init
getTracks('love')
// test init
