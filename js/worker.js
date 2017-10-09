importScripts('canny.js');

self.addEventListener('message', function(e) {
  var data = e.data;

  switch (data.cmd) {
    case 'processImg':
    	var blur, algo, nms, hyst, invert;

    	var imgData = new GrayImageData(data.image.width, data.image.height);
		imgData.loadData(data.image.data);
    	
    	blur = CannyJS.gaussianBlur(imgData, data.settings.blurSigma, data.settings.blurKernel);

	    switch (data.settings.edgeAlgo) {
	    	case "Roberts":
	    		algo = CannyJS.roberts(blur, data.settings.edgeKernel);
	    		break;
	    	case "Prewitt":
	    		algo = CannyJS.prewitt(blur, data.settings.edgeKernel);
	    		break;
	    	default:
	    		algo = CannyJS.sobel(blur, data.settings.edgeKernel);
	    		break;
	    }

	    nms = CannyJS.nonMaximumSuppression(algo);
	    hyst = CannyJS.hysteresis(nms, data.settings.hystHigh, data.settings.hystLow);

	    if (data.settings.invert)
	    	invert = CannyJS.invert(hyst);
	    else
	    	invert = hyst;

     	self.postMessage({ 'success':true, "result":invert });
     	break;
    default:
    	self.postMessage('UNKOWN COMMAND: ' + data.msg);
    	break;
    }
}, false);