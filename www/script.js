/* jshint
browser: true,
devel: true,
*/
/*
global CanvasCamera
*/
var pictureSource; // picture source
var destinationType; // sets the format of returned value 

// Wait for Cordova to connect with the device
//


document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used!
//
function onDeviceReady() {
	console.log(window.device);
	console.log(window.plugins);
	alert('device ready');
	/*var objCanvas = document.getElementById("canvas");
	window.plugin.CanvasCamera.initialize(objCanvas);
	alert('canvas ready');*/
	document.getElementById("takePicture").addEventListener("click", takePicture, false);
	//document.getElementById("takePicturePreview").addEventListener("click", onTakePicture, false);

}

/*function onTakePicture() {
	CanvasCamera.takePicture(onTakeSuccess);
	alert('onTakePicture');
		var opt = {
		quality: 75,
		destinationType: CanvasCamera.DestinationType.DATA_URL,
		encodingType: CanvasCamera.EncodingType.JPEG,
		saveToPhotoAlbum: false,
		correctOrientation: true,
		width: 200,
		height: 200
	};
	CanvasCamera.start(opt);
}

function onTakeSuccess(data) {
	alert('ontakesucces');
	var image = document.getElementById("myImage");
	image.src = "data:image/jpeg;base64," + data; // options.encodingType == CanvasCamera.EncodingType.JPEG
	// image.src = "data:image/png;base64," + data; // options.encodingType == CanvasCamera.EncodingType.PNG
}*/



function takePicture(e) {
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 50,
		destinationType: navigator.camera.DestinationType.DATA_URL,
		allowEdit: true,
		correctOrientation: true
	});

}

function onSuccess(imageData) {
	//var image = document.getElementById("myImage");
	//image.src = "data:image/jpeg;base64," + imageData;
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var imageObj = document.getElementById("myImage");
	var width;
	imageObj.src = "data:image/jpeg;base64," + imageData;

	width = imageObj.width;

	canvas.setAttribute('width', width);
	canvas.setAttribute('height', width);
	context.drawImage(imageObj, 0, 0, width, width, 0, 0, width, width);
	var dataURL = canvas.toDataURL();
	document.getElementById("defImg").setAttribute('crossOrigin', 'anonymous');
	document.getElementById("defImg").src = dataURL;
	//imageObj.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
	setTimeout(function () {
		//alert('Failed because: ' + message);
	}, 0);

}