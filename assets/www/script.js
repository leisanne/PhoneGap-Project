// Wait for Cordova to load
//

document.addEventListener("deviceready", onDeviceReady, false);


/*
 *  storage
 */
function onDeviceReady() {
	var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':10000});
}

/*
 * Camera functions
 */

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadFile(mediaFiles[i]);
	}
}

// Called if something bad happens.
// 
function captureError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureImage() {
	// Launch device camera application, 
	// allowing user to capture up to 2 images
	navigator.device.capture.captureImage(captureSuccess, captureError, {
		limit : 2
	});
}

// A button will call this function
//
function captureVideo() {
	// Launch device video recording application, 
	// allowing user to capture up to 2 video clips
	navigator.device.capture.captureVideo(captureSuccess, captureError, {
		limit : 2
	});
}

// Upload files to server
function uploadFile(mediaFile) {
	var ft = new FileTransfer(), path = mediaFile.fullPath, name = mediaFile.name;

	ft.upload(path, "http://my.domain.com/upload.php", function(result) {
		console.log('Upload success: ' + result.responseCode);
		console.log(result.bytesSent + ' bytes sent');
	}, function(error) {
		console.log('Error uploading file ' + path + ': ' + error.code);
	}, {
		fileName : name
	});
}

/*
 * Capture audio
 * 
 */

//Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		uploadFile(mediaFiles[i]);
	}
}

// Called if something bad happens.
// 
function captureError(error) {
	var msg = 'An error occurred during capture: ' + error.code;
	navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureAudio() {
	// Launch device audio recording application, 
	// allowing user to capture up to 2 audio clips
	navigator.device.capture.captureAudio(captureSuccess, captureError, {
		limit : 2
	});
}

// Upload files to server
function uploadFile(mediaFile) {
	var ft = new FileTransfer(), path = mediaFile.fullPath, name = mediaFile.name;

	ft.upload(path, "http://my.domain.com/upload.php", function(result) {
		console.log('Upload success: ' + result.responseCode);
		console.log(result.bytesSent + ' bytes sent');
	}, function(error) {
		console.log('Error uploading file ' + path + ': ' + error.code);
	}, {
		fileName : name
	});
}

/*
 *
 *	GoogleMap functions
 */

var onSuccess = function(position) {
    //alert('Latitude: '  + position.coords.latitude   + '\n' +
    //      'Longitude: ' + position.coords.longitude  + '\n');

    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    //MAP
    var mapOptions = {
        center: new google.maps.LatLng(myLat, myLong),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   
    
    var map = new google.maps.Map(document.getElementById("map_canvas"),
                                  mapOptions);
    var marker = new google.maps.Marker(
    		{
    			position: map.getCenter(),
    			map: map,
    			title: 'Current location'
    		}
    );
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}