var accordion = function() {
	var originalSize;
	var dt = toArray(document.querySelectorAll('dt'));
	var dd = toArray(document.querySelectorAll('dd'));
	var hide = function(i) {
		dd[i].style.height = 0;
		dd[i].style.fontSize = 0;
		dd[i].style.opacity = 0;
	};
	var sliderItenClick = function (i, originalSize) {
		if (dd[i].style.height !== originalSize) {
			dd[i].style.height = originalSize;
			dd[i].style.fontSize = '16px';
			dd[i].style.opacity = 1;
			if (i < dd.length-1) { dd[i].style.borderWidth = '1em 0 1.5em 0'; }
			else { dd[i].style.borderWidth = '1em 0 0 0'; }
		} else { hide(i); }
	};

	for (var i=0; i < dt.length; i++) { // makes the assumption that dt - dd will always be a 1-to-1 relationship
		originalSize = dd[i].offsetHeight + 'px';
		console.log(originalSize);
		(function(dt, i, originalSize) {
			dt[i].addEventListener('click', function() { sliderItenClick(i, originalSize); }, false);	
		})(dt, i, originalSize);
		hide(i);
	}
};