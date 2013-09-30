// @prepros-prepend !contentLoaded.js
// @prepros-prepend !accordian.js
// @prepros-prepend !committeePageNavigation.js
// @prepros-prepend !subPageNavigation.js
// @prepros-prepend !contact.js

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

contentLoaded(window, function() {
	// To stop stuff from animating on page load
	document.querySelector("body").className = "";

	// Animate the navigation swoosh
	// var swoosh = document.querySelector('.swoosh');
	// var home = document.querySelector('.Home');
	// var calendar = document.querySelector('.Calendar');
	// var committee = document.querySelector('.Committee');
	// var forms = document.querySelector('.Forms');
	// var resources = document.querySelector('.Resources');
	// var blog = document.querySelector('.Blog');
	// var contact = document.querySelector('.Contact');
	// var faq = document.querySelector('.FAQ');

	// var nav = [home, calendar, committee, forms, resources, blog, contact, faq];

	// var swooshMove = function(el) {
	// 	console.log(el);
	// 	switch (el) {
	// 		case home:
	// 			swoosh.style.left = '43px';
	// 			break;
	// 		case calendar:
	// 			swoosh.style.left = '128px';
	// 			break;
	// 		case committee:
	// 			swoosh.style.left = '227px';
	// 			break;
	// 		case forms:
	// 			swoosh.style.left = '291px';
	// 			break;
	// 		case resources:
	// 			swoosh.style.left = '386px';
	// 			break;
	// 		case blog:
	// 			swoosh.style.left = '436px';
	// 			break;
	// 		case contact:
	// 			swoosh.style.left = '511px';
	// 			break;
	// 		case faq:
	// 			swoosh.style.left = '556px;';
	// 			break;
	// 	}
	// };

	// for (var i=0; i < nav.length; i++) {
	// 	console.log(nav[i]);
	// 	nav[i].addEventListener('mouseenter', function() {
	// 		console.log(this);
	// 		swooshMove(this);
	// 	});
	// 	nav[i].addEventListener('mouseleave', function() {
	// 		swooshReturn(this);
	// 	})
	// }

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
});