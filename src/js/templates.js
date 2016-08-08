import {clientID} from './token.js'

function trackTemplate (tracks) {
  var title = tracks.title;
  var artist = tracks.user.username;
  var coverURL = tracks.artwork_url;
  var streamURL = tracks.stream_url;
  if (!coverURL) {coverURL = "images/noart.png"};
  return `<div class="track-result" data-stream="${streamURL}">
    <img id="track-img" src="${coverURL}"></img>
    <div class="track-info">
    <p><h3>${title}</h3></p>

    <p>by ${artist}</p>
    </div>
    </div>`
  };

  function audioTemplate (stream) {
  return `<audio autoplay="true" controls="true" src="${stream}/?client_id=${clientID}">Browser doesnt support audio tag</audio>`
};

export { trackTemplate, audioTemplate };
