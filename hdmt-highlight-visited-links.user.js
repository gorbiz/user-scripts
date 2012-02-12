// ==UserScript==
// @name           HDMT highlight visited links
// @namespace      http://www.passionismandatory.com/userscripts/hdmt-highlight-visited-links
// @include        http://hdmt.net/*
// @match          http://hdmt.net/*
// @description    Will highlight visited links on HDMT.net making it easier to see which episodes you have watched.
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "html body a { color: blue; } ";
css.innerHTML += "html body a:visited { color: purple; } ";
document.body.appendChild(css);
