// @prepros-prepend !contentLoaded.js
// @prepros-prepend !accordian.js
// @prepros-prepend !calendar.js
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

window.onload = function() { // a lot of people think this is bad and that I should use DOMContentLoaded
// but they would be wrong to suggest that because some of these scripts change visual stuff on the page and it needs the style sheet
// to be fully rendered for it. DOMContentLoaded doesn't guarantee that. window.onload does.
	
	// To stop stuff from animating on page load
	console.log("test");
	console.log(window.location.href.indexOf(page));
	document.querySelector("body").className = "";

	var subPageNav;
	var getSubPageNav = function(el) { return toArray(document.querySelectorAll(el)); }
	var isPage = function(page) { return window.location.href.indexOf(page) > -1; }

	if (isPage("resources")) {
		subPageNavigation(getSubPageNav('nav.two > a'));
	}
	if (isPage("calendar")) {
		console.log("In calendar");
		calendarPrep();
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
	console.log(window.location.href.indexOf(page));
};

function calendarPrep(){
	// page is now ready, initialize the calendar...
	console.log("HELLO, I AM YELLING AT YOU");
    var calendar = $('#calendar').fullCalendar({
        // put your options and callbacks here
        //events: 'https://www.google.com/calendar/feeds/rvkgqt49saqhg4i17fo48u8uk0%40group.calendar.google.com/public/basic',
        events: 'http://ntiddaspdptest.csh.rit.edu:6543/calendar/events',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    },
                    true // make the event "stick"
                );
                jQuery.post(
                    "/calendar/addevent" // your url
                    , { // re-use event's data
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay,
                        location: '',
                        description: ''
                    }
                );
            }
            calendar.fullCalendar('unselect');
        },
    })
};