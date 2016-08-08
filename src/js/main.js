// IMPORTS
// token.js has API auth token, .gitignore is your friend

import $ from "jquery";

import {clientID} from "./token.js";

import { trackTemplate, audioTemplate } from "./templates.js"

var SC = require('soundcloud');

// initialize Soundcloud module and populate search content

SC.initialize({
  client_id: clientID,
});

// MAIN

var trackList = null;
search(1)

function writeToPage (data) {
  $(".search-results").html("");
data.forEach(function(datum){
 $(".search-results").append(trackTemplate(datum))
});
}
// Writes searched and fetched tracks to page by looping over array after clearing the results <div>


function search (query) {
  SC.get('/tracks', {
    q: `"${query}"`,
    limit: '15'
  }).then(function(tracks) {
    trackList = tracks
    writeToPage(trackList);
    });
  };
// This function searches Soundcloud for the query value supplied and stores the results


$('#searchbutton').click(function(){
  var form = document.getElementById('searchform');
  var query = form.value
  search(query);
});

// This sets an event listener on the search button and takes the value of themsearch form when the button is clicked


$('#searchcontent').on('click', '.track-result', function(data) {
  var streamURL = data.currentTarget.dataset.stream
  $(".audio-player").html(audioTemplate(streamURL))
  });
// plays
