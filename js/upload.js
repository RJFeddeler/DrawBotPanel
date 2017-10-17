function annealStart() {
	scaleBoxError();
}

function annealPause() {

}

function annealStop() {

}

function loadNewFile() {
	var validFileTypes = ['rob', 'jpg', 'jpeg', 'png', 'bmp', 'svg'];

	if (fileInput.files && fileInput.files[0]) {
	    var file = fileInput.files[0];
	    var ext = file.name.split('.').pop().toLowerCase();
	    
	    if (validFileTypes.indexOf(ext) > -1) {
	    	if (ext === "rob") {
	            loadFiletypeROB(file);
	        }
	        else if (ext === 'svg') {
	        	loadFiletypeSVG(file);
	        }
	        else {
	        	LoadFiletypeRaster(file);
	        }
	    }
	    else {
	        alert("Incompatible file type.");
	    }
	}
	else {
	    alert("There was a problem opening the file.")
	}
}

function loadFiletypeROB(file) {
	var reader = new FileReader();
    reader.onload = function(e) {
        var lines = e.target.result.split(/[\r\n]+/g);
        for (i = 0; i < lines.length; i++) {
            if (i === 0) {
                if (0) { // (!assertROBHeader(ext, lines[i].split(","))) {
                    alert("File header is corrupt.");
                    return;
                }
            }
            else {
                if (0) { //(!assertROBCommand(lines[i].split(","))) {
                    alert("File contains invalid commands.");
                    return;
                }
            }
        }

        document.getElementById("fileInputText").placeholder = fileInput.files[0].name; 

        lines.forEach(function(line, index) {
            var words = line.split(',');
            if (words[0] === 'C11')
            	app.addLineList(words);
            if (words[0] === 'C12')
                app.addPolygon(words);
        });

        app.drawLines();
    }

    reader.readAsText(file);
}

function LoadFiletypeSVG(file) {

}

function LoadFiletypeRaster(file) {
	var canvas_offscreen = document.createElement('canvas');
	var canvas_full = document.createElement('canvas');
	var canvas_small = document.getElementById("modal-canvas");

	var img = new Image();
	var sWidth = 0, 
		sHeight = 0;

	var worker;

	var zoomCanvas = $("#zoom-canvas");
	var zoomCtx = zoomCanvas[0].getContext('2d');
	var zoomShowing = false;

	document.getElementById("modal-canvas").addEventListener("mouseenter", showZoomCanvas);
	document.getElementById("modal-canvas").addEventListener("mouseleave", hideZoomCanvas);
	document.getElementById("btn_filter_apply").addEventListener("click", updateFilteredImg);
	document.getElementById("btn_filter_save").addEventListener("click", function() { traceCanvas(getCanvasData(canvas_offscreen)); });

	loadSliders();
	$("#imgFilterModal").on("show.bs.modal", function() { var height = 732; $(this).find(".modal-body").css("max-height", height); }); //var height = $(window).height() - 200;
	$('#imgFilterModal').modal({ keyboard: false });

	img.addEventListener("load", onloadImage);
	img.src = URL.createObjectURL(file);

	if (typeof(Worker) !== "undefined") {
		worker = new Worker('js/worker.js');
	  	worker.addEventListener('message', workerCallback, false);
	}

	function getCanvasData(canvas) {
		var ctx = canvas.getContext("2d");
		var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

		return data;
	}

	function onloadImage() {
		canvas_offscreen.width = parseInt(img.width);
		canvas_offscreen.height = parseInt(img.height);

    	canvas_full.width = parseInt(img.width);
    	canvas_full.height = parseInt(img.height);

    	if (canvas_full.width > canvas_full.height) {
    		sWidth = 300;
    		sHeight	= 150; //(canvas_full.height / canvas_full.width) * sWidth;
    	}
    	else {
    		sHeight = 300;
    		sWidth = 150; //(canvas_full.width / canvas_full.height) * sHeight;
    	}

    	var ctx_full = canvas_full.getContext("2d");
    	ctx_full.drawImage(img, 0, 0);

    	HermiteDownsample(canvas_full, canvas_small, sWidth, sHeight);

    	var c = document.getElementById('modal-canvas');
    	c.addEventListener("mousemove", function(e) {
    		var mousePos = getMousePos(c, e);
    		var smRect = getRect(c);
    		var canvasPosX = (mousePos.x / (smRect.right - smRect.left)) * canvas_full.width - 150;
    		var canvasPosY = (mousePos.y / (smRect.bottom - smRect.top)) * canvas_full.height - 75;

    		if (canvasPosX < 0)
    			canvasPosX = 0;
    		if (canvasPosY < 0)
    			canvasPosY = 0;

    		if (canvasPosX > (canvas_full.width - 300))
    			canvasPosX = canvas_full.width - 300;
    		if (canvasPosY > (canvas_full.height - 150))
    			canvasPosY = canvas_full.height - 150;
    		
    		zoomCtx.drawImage(canvas_offscreen, -canvasPosX, -canvasPosY);
    	});

    	$('imgFilterModal').modal('show');
    	updateFilteredImg();
    }

    function updateFilteredImg() {
    	dimScreen();

    	var imgData = new GrayImageData(canvas_full.width, canvas_full.height);
		imgData.loadCanvas(canvas_full);

    	var imgSettings = new GrayImageSettings();
    	setImageSettings(imgSettings);

		workerStart(imgData, imgSettings);

    }

    function setImageSettings(settings) {
    	var valBlurKernel, valBlurSigma, valEdgeAlgo, valEdgeKernel, valHyst, valHystHigh, valHystLow, valInvert;

    	valBlurKernel = $('#filter_blurKernel').slider("getValue");
    	valBlurSigma = $('#filter_blurSigma').slider("getValue");
    	valEdgeKernel = $('#filter_edgeKernel').slider("getValue");
    	valHyst = $("#filter_cannyHysteresis").slider("getValue");
    	valHystLow = (valHyst[0] <= valHyst[1]) ? valHyst[0] : valHyst[1];
    	valHystHigh = (valHyst[0] <= valHyst[1]) ? valHyst[1] : valHyst[0];

    	if ($("#edgeAlgoRoberts").is(":checked"))
    		valEdgeAlgo = "Roberts";
    	else if ($("#edgeAlgoPrewitt").is(":checked"))
    		valEdgeAlgo = "Prewitt";
    	else
    		valEdgeAlgo = "Sobel";

    	if ($("#filter_invert").is(":checked"))
    		valInvert = true;
    	else
    		valInvert = false;

    	settings.updateSettings(valBlurKernel, valBlurSigma, valEdgeAlgo, valEdgeKernel, valHystHigh, valHystLow, valInvert);
    }

    function workerStart(image, settings) {
    	worker.postMessage({ 'cmd': 'processImg', 'image': image, 'settings': settings })
    }

    function workerCallback(e) {
        if (e.data.success) {
  			var imgData = e.data.result;
  			console.log(imgData.width + ", " + imgData.height);

  			var imgData = new GrayImageData(e.data.result.width, e.data.result.height);
  			imgData.loadData(e.data.result.data);
  			imgData.drawOn(canvas_offscreen);

  			undimScreen();

  			// Download drawing as PNG
  			//var image = canvas_offscreen.toDataURL("image/png").replace("image/png", "image/octet-stream");
  			//window.location.href=image;
		}
	}

	function showZoomCanvas() {
    	var animationName = 'animated fadeIn'
    	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    	$('#zoom-canvas').css('z-index', 100);
    	$('#zoom-canvas').addClass(animationName).one(animationEnd, function() {
    		$(this).css('opacity', '1');
    		$(this).removeClass(animationName);
    		zoomShowing = true;
    	});
    }

    function hideZoomCanvas() {
    	var animationName = 'animated fadeOut'
    	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    	$('#zoom-canvas').addClass(animationName).one(animationEnd, function() {
    		$(this).css('opacity', '0');
    		$(this).css('z-index', -1);
    		$(this).removeClass(animationName);
    		zoomShowing = false;
    	});
    }

	function getRect(canvas) {
		return canvas.getBoundingClientRect();
	}
	
	function getMousePos(canvas, evt) {
    	var rect = getRect(canvas);
        return {
        	x: evt.clientX - rect.left,
        	y: evt.clientY - rect.top
       	};
    }

    function loadSliders() {
    	$("#filter_blurKernel").slider({});
		$("#sliderVal_blurKernel").text($('#filter_blurKernel').slider("getValue"));
		$("#filter_blurKernel").on("slide", function(slideEvt) { $("#sliderVal_blurKernel").text(slideEvt.value); });
		$("#filter_blurKernel").on("change", function(slideEvt) { $("#sliderVal_blurKernel").text($(this).val()); });

		$("#filter_blurSigma").slider({});
		$("#sliderVal_blurSigma").text($('#filter_blurSigma').slider("getValue"));
		$("#filter_blurSigma").on("slide", function(slideEvt) { $("#sliderVal_blurSigma").text(slideEvt.value); });
		$("#filter_blurSigma").on("change", function(slideEvt) { $("#sliderVal_blurSigma").text($(this).val()); });

		$("#filter_edgeKernel").slider({});
		$("#sliderVal_edgeKernel").text($('#filter_edgeKernel').slider("getValue"));
		$("#filter_edgeKernel").on("slide", function(slideEvt) { $("#sliderVal_edgeKernel").text(slideEvt.value); });
		$("#filter_edgeKernel").on("change", function(slideEvt) { $("#sliderVal_edgeKernel").text($(this).val()); });

		$("#filter_cannyHysteresis").slider({});
		var tuple = $("#filter_cannyHysteresis").slider("getValue");
		$("#sliderVal_hysteresis1").text(tuple[0]);
		$("#sliderVal_hysteresis2").text(tuple[1]);
		$("#filter_cannyHysteresis").on("slide", function(slideEvt) { $("#sliderVal_hysteresis1").text(slideEvt.value[0]); $("#sliderVal_hysteresis2").text(slideEvt.value[1]); });
    }
}

var scale_value 			= 100;
var scale_opacity_active 	= 1.0;
var scale_opacity_inactive 	= 0.3;
var timeOut;

function setImageScale(scale) {
	var minVal = 1, maxVal = 200;

    if (scale && scale >= minVal && scale <= maxVal)
        document.getElementById("preview_scale").value = scale_value = scale;
    else
        showAlertError("Please choose an integer in the range of " + minVal + " - " + maxVal + "%");
	
    setImageScaleBoxInactive();
}

function scaleBoxError() {
	var animationName = 'animated rubberBand';
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$('#input-group-scale').addClass(animationName).one(animationEnd, function() {
		$(this).removeClass(animationName);
	});

	showAlertError("Please choose a valid integer in the range.");
}

function scaleBoxChange(animOut = 'zoomOut', animIn = 'bounceIn') {
	var animationName = 'animated ' + animOut;
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$('#input-group-scale').addClass(animationName).one(animationEnd, function() {
		$(this).removeClass(animationName);

		animationName = 'animated ' + animIn;
		$('#input-group-scale').addClass(animationName).one(animationEnd, function() {
			$(this).removeClass(animationName);
		});
	});
}

function setImageScaleBoxActive() {
	clearTimeout(timeOut);
	$('#input-group-scale').css("opacity", scale_opacity_active);
}

function setImageScaleBoxInactive(milliseconds = 1000) {
	clearTimeout(timeOut);
	timeOut = setTimeout(function() {
		$('#input-group-scale').css("opacity", scale_opacity_inactive);
		$('#preview_scale').val(scale_value);
	}, milliseconds);
}
