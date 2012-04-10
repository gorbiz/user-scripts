// ==UserScript==
// @name           HDMT semi-fullscreen
// @namespace      http://www.passionismandatory.com/userscripts/hdmt-semi-fullscreen
// @include        http://hdmt.net/movieplay.php*
// @include        http://hdmt.net/tvplay.php*
// @match          http://hdmt.net/movieplay.php*
// @match          http://hdmt.net/tvplay.php*
// @description    Will make the HDMT.net player populate the full height and with of the browser window. To toggle bump the right side of the screen with your mouse pointer (hover the left most pixel of the browser window).
// ==/UserScript==

// A function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// The guts of this userscript
function main() {
	function toggle_semi_fullscreen() {
		$('#player').attr('style', ($('#player').css('position') != 'absolute') ? 'display:block; position:absolute; left:1px; top:0; width:' + ($(window).width() - 1) + 'px; height:100%;' : 'display:block;');
	}
	
    $(window).resize(function() {
        toggle_semi_fullscreen();
        toggle_semi_fullscreen();
    });
    
    toggle_semi_fullscreen();
    
	$('body').append('<div id="semi-trigger" style="background:black; position:absolute; left:0; top:0; left:0; width: 1px; height: 100%;"></div>');
	$('#semi-trigger').hover(
		function () { toggle_semi_fullscreen(); },
		function () {}
	);
}

// Load jQuery and execute the main function
addJQuery(main);