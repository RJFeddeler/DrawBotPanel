function dimScreen() {
    document.getElementById("dimmer").style.width = "100%";
    document.getElementById("loader").style.display = "block";
}

function undimScreen() {
    document.getElementById("dimmer").style.width = "0%";
    document.getElementById("loader").style.display = "none";
}

function showAlertError(message) { 		showAlert("red", 	"ERROR", message); }
function showAlertWarning(message) { 	showAlert("yellow", "WARNING", message); }
function showAlertSuccess(message) { 	showAlert("green", 	"SUCCESS", message); }
function showAlertNote(message) { 		showAlert("blue", 	"NOTE", message); }

function showAlert(color, heading, message) {
	var animationName = 'animated fadeInUp'
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

	if (color === "red")
		$('#myAlert').addClass('alert-red');
	else if (color === "yellow")
		$('#myAlert').addClass('alert-yellow');
	else if (color === "green")
		$('#myAlert').addClass('alert-green');
	else if (color === "blue")
		$('#myAlert').addClass('alert-blue');
	else if (color === "orange")
		$('#myAlert').addClass('alert-orange');
	else if (color === "gray")
		$('#myAlert').addClass('alert-gray');
	else
		$('#myAlert').addClass('alert-gray');

	document.getElementById('alertHeading').innerHTML = heading;
	document.getElementById('alertBody').innerHTML = message;
	$('#myAlert').css('z-index', 9999);
	$('#myAlert').addClass(animationName).one(animationEnd, function() {
		$(this).css('opacity', '1');
		$(this).removeClass(animationName);
		setTimeout(function() { hideAlert(color); }, 2500);
	});
}

function hideAlert(color) {
	var animationName = 'animated fadeOutDown'
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
	
	$('#myAlert').addClass(animationName).one(animationEnd, function() {
		$(this).css('opacity', '0');
		$('#myAlert').css('z-index', -1);
		$(this).removeClass(animationName);
		document.getElementById('alertHeading').innerHTML = '';
		document.getElementById('alertBody').innerHTML = '';
		
		if (color === "red")
			$('#myAlert').removeClass('alert-red');
		else if (color === "yellow")
			$('#myAlert').removeClass('alert-yellow');
		else if (color === "green")
			$('#myAlert').removeClass('alert-green');
		else if (color === "blue")
			$('#myAlert').removeClass('alert-blue');
		else if (color === "orange")
			$('#myAlert').removeClass('alert-orange');
		else if (color === 'gray')
			$('#myAlert').removeClass('alert-gray');
		else
			$('#myAlert').removeClass('alert-gray');
	});
}