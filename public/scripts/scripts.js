// @prepros-prepend !contentLoaded.js
// @prepros-prepend !accordian.js
// @prepros-prepend !committeePageNavigation.js
// @prepros-prepend !subPageNavigation.js
// @prepros-prepend !contact.js

var rootLoc = 'http://athena.csh.rit.edu:'

var hasClass = function (element, className) {
	return new RegExp(' ' + className + ' ').test(' ' + element.className + ' ');
};
var removeClass = function (element, removeClass) {
	var regex = new RegExp('(?:^|\\s)' + removeClass + '(?!\\S)');
	element.className = element.className.replace(regex, '' );
};
var toArray = function (element) {
	return Array.prototype.slice.call(element);
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
		return pair[1];
		}
	}
}

function formatDate(dateString){
	console.log("FormatDate: " + dateString);
	if (dateString !== undefined && dateString !== null) {
		result = moment(dateString).format( "MM/DD/YYYY hh:mm a");
		console.log(result);
		return result;
	}
	return "";
}

function getMonthNum(mon){
	var dates = {};
	dates["jan"] = "01";
	dates["feb"] = "02";
	dates["mar"] = "03";
	dates["apr"] = "04";
	dates["may"] = "05";
	dates["jun"] = "06";
	dates["jul"] = "07";
	dates["aug"] = "08";
	dates["sep"] = "09";
	dates["oct"] = "10";
	dates["nov"] = "11";
	dates["dec"] = "12";

	return dates[mon];

}

function translateDate(date) {
	var dateExplode = date.split(" ");
	var mon = getMonthNum(dateExplode[1]);

	var date = mon + "/";
	date += dateExplode[2] + "/";
	date += dateExplode[3] + " 12:00 PM";
	return date;
}

window.onload = function() { // a lot of people think this is bad and that I should use DOMContentLoaded
// but they would be wrong to suggest that because some of these scripts change visual stuff on the page and it needs the style sheet
// to be fully rendered for it. DOMContentLoaded doesn't guarantee that. window.onload does.
	
	// To stop stuff from animating on page load
	//console.log(window.location.href.indexOf(page));
	document.querySelector("body").className = "";

	var subPageNav;
	var getSubPageNav = function(el) { return toArray(document.querySelectorAll(el)); }
	var isPage = function(page) { return window.location.href.indexOf(page) > -1; }

	if (isPage("resources")) {
		subPageNavigation(getSubPageNav('nav.two > a'));
	}
	if (isPage("committee")) {
		subPageNavigation(getSubPageNav('nav.two > a'));
		committeePageNavigation();
	}
	if (isPage("contact")) {
		contactValidation();
	}
	if (isPage("forms")) {
		subPageNavigation(getSubPageNav('nav.custom2 a'));
	}
	if(isPage("faq")) {
		accordion();
	}
};