var contactValidation = function() {
	var nameField = document.querySelector('#name');
	var nameError = document.querySelector('#nameError');
	var emailField = document.querySelector('#email');
	var emailError = document.querySelector('#emailError');
	var subjectField = document.querySelector('#subject');
	var subjectError = document.querySelector('#subjectError');
	var messageField = document.querySelector('#message');
	var messageError = document.querySelector('#messageError');
	var submitButton = document.querySelector('#submitButton');

	var isPossibleEmail = function(email) {
		var noSpaces = email.indexOf(" ");
		var atSign = email.indexOf("@");
		var dotExists;
		if (atSign > -1 && noSpaces > -1) {
			dotExists = email.substring(atSign).indexOf(".");
			if (dotExists > -1) {
				return true;
			}
		}
		return false;
	};

	nameField.addEventListener('blur', function() {
		if (this.value !== "" && !this.value.match(/^\w* .+/)) {
			nameError.style.display = "inline";
		} else {
			nameError.style.display = "";
		}
	});

	emailField.addEventListener('blur', function() {
		if (this.value !== "" && !isPossibleEmail(this.value)) {
			emailError.style.display = "inline";
		} else {
			emailError.style.display = "";
		}
	});

	subjectField.addEventListener('blur', function() {
		if (this.value !== "" && !this.value.match(/^\w* .+/)) {
			subjectError.style.display = "inline";
		} else {
			subjectError.style.display = "";
		}
	});

	messageField.addEventListener('blur', function() {
		if (this.value !== "" && !this.value.match(/^\w* .+/)) {
			messageError.style.display = "inline";
		} else {
			messageError.style.display = "";
		}
	});

	submitButton.addEventListener('click', function() {  });
};