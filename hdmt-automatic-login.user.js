// ==UserScript==
// @name           HDMT automatic login
// @namespace      http://www.passionismandatory.com/userscripts/hdmt-automatic-login
// @include        http://hdmt.net/*
// @match          http://hdmt.net/*
// @description    Automatically logs you in after you have loged in once manually. Warning: This is not secure, your password will be stored in a cookie.
// ==/UserScript==


function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function loggedin() {
	// Believe to be loged in if on a page that plays a movie or a show.
	// This isn't correct, but that page doesn't contain any "Logout" links and as long as you click your way to this page everything will be fine. A case of good enough for now.
	if (document.URL.indexOf("movieplay.php") != -1 || document.URL.indexOf("tvplay.php") != -1) {
		return true;
	}
	var anchors = document.getElementsByTagName("a");
	for(var i = 0; i < anchors.length; i++) {
		if(anchors[i].innerHTML.indexOf("Logout") != -1) {
			return true;
		}
	}
	return false;
}

/**
 * WARNING This is BAD security but it is very convenient ;)
 * Change the password field to a text field so that user name and password can be stored in a cookie
 * And login automatically if not logged in.
 */
document.getElementsByName("password")[0].setAttribute('type', 'text');

var loginbutton = document.getElementsByName("submit_button")[0];
loginbutton.setAttribute('onclick', 'exdate=new Date(); exdate.setDate(exdate.getDate()+1);document.cookie="temp_username="+document.getElementsByName("username")[0].value+"; expired="+exdate.toUTCString();document.cookie="temp_password="+document.getElementsByName("password")[0].value+"; expired="+exdate.toUTCString();');

// If all is well persist the username and password for a year
if (getCookie('temp_username') && getCookie('temp_password') && loggedin()) {
	setCookie('passion_username', getCookie('temp_username'), 365);
	setCookie('passion_password', getCookie('temp_password'), 365);
	setCookie('temp_username', '', 0);
	setCookie('temp_password', '', 0);
}

// Now for the logging in
if (!loggedin() && getCookie('passion_username') && getCookie('passion_password')) {
	document.getElementsByName("username")[0].value = getCookie('passion_username');
	document.getElementsByName("password")[0].value = getCookie('passion_password');
	document.getElementsByName("submit_button")[0].click();
}
