// ==UserScript==
// @name           Coursera friendly video player
// @description    Auto hide coursera.org's video controls & toggle play on click
// @match          https://class.coursera.org/*
// @version        0.2
// ==/UserScript==

function autoHideControls() {
  var controls, timeout;
  function hideControls() {
    timeout = setTimeout(function() {
      controls = document.getElementsByClassName('mejs-controls')[0];
      if (!controls) return;
      controls.style.display = 'none';
    }, 2000);
  }
  window.onmousemove = function() {
    clearTimeout(timeout);
    hideControls();
    if (controls) controls.style.display = '';
  }
  hideControls();
}
function togglePlayOnClickVideo() {
  var video = document.getElementsByTagName('video')[0];
  if (!video) return;
  video.onclick = function() {
    this[this.paused ? 'play' : 'pause']();
  }
}
window.addEventListener('load', autoHideControls, false);
window.addEventListener('load', togglePlayOnClickVideo, false);