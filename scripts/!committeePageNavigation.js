var committeePageNavigation = function () {
	var h2 = document.querySelectorAll('h2');
	var all = document.querySelector('#all');
	var cias = document.querySelector('#cias');
	var alot = document.querySelector('#alot');
	var la = document.querySelector('#la');
	var alot2 = document.querySelector('#alot2');
	var rtc = document.querySelector('#rtc');
	var people = document.querySelectorAll('.person');
	var ciasTeam = document.querySelectorAll('.cias');
	var alotTeam = document.querySelectorAll('.alot');
	var laTeam = document.querySelectorAll('.la');
	var alot2Team = document.querySelectorAll('.alot2');
	var rtcTeam = document.querySelectorAll('.rtc');

	var teamsDict = {
		all: [all, people],
		cias: [cias, ciasTeam],
		alot: [alot, alotTeam],
		la: [la, laTeam],
		alot2: [alot2, alot2Team],
		rtc: [rtc, rtcTeam]
	};

	var nodeDisplayForEach = function(nodeList, action) {
		return Array.prototype.forEach.call(nodeList, function(elem) {
			elem.style.display = action;
		});
	};

	var toggleShow = function(key) {
		if (key === teamsDict[all]) {
			nodeDisplayForEach(h2, "");
		} else {
			nodeDisplayForEach(h2, "none");
			nodeDisplayForEach(people, "none");
		}
		nodeDisplayForEach(teamsDict[key][1], "");
	};

	var toggleActive = function(el) {
		var key;
		for (var team in teamsDict) {
			if (teamsDict.hasOwnProperty(team)) {
				if (teamsDict[team][0] === el) {
					key = team;
				}
				teamsDict[team][0].className = "";
			}
		}
		el.className = "active";
		toggleShow(key);
	};

	for (var team in teamsDict) {
		if (teamsDict.hasOwnProperty(team)) { // safety check for using for...in 
			teamsDict[team][0].addEventListener('click', function() { toggleActive(this); }, false);
		}
	}

	var subPageNav = Array.prototype.slice.call(document.querySelectorAll('nav.two > a'));
	var subPages = Array.prototype.slice.call(document.querySelectorAll('.subpage'));
	
	for (var i = 0; i < subPageNav.length; i++) {
		subPageNav[i].addEventListener('click', function() {
			console.log('click');
			for (var i = 0; i < subPages.length; i++) {
				if (subPages[i] === "" || "block")
					subPages[i].style.display = "none";
				else
					subPages[i].style.display = "block";
			}
		}, false);
	}
};