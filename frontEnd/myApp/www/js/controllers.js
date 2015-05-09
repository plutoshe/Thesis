angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopover) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', function(popover) {
	    $scope.popover = popover;
	  });

})

.controller('ChatsCtrl', function($scope, $ionicPopover, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

	$scope.popover = $ionicPopover.fromTemplate(template, {
		scope: $scope
	});

	// .fromTemplateUrl() method
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
	scope: $scope
	}).then(function(popover) {
	$scope.popover = popover;
	});

	// $ionicPopover.fromTemplateUrl('templates/popover.html', {
	// scope: $scope,
	// }).then(function(popover) {
	// $scope.popover = popover;
	// });

	// $ionicPopover.fromTemplateUrl('templates/popover.html', function(popover) {
	//     $scope.popover = popover;
	//   });

	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
	$scope.popover.hide();
	};
	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
	$scope.popover.remove();
	});
	// Execute action on hide popover
	$scope.$on('popover.hidden', function() {
	// Execute action
	});
	// Execute action on remove popover
	$scope.$on('popover.removed', function() {
	// Execute action
	});

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	
	$scope.chat = Chats.get($stateParams.chatId);
	$scope.toggle = function() {
	        
	}			
})

// .controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
    
// });

// .controller('TakephotoCtrl', function($scope, $cordovaCamera, $cordovaFile, imgURI) {

// 	$scope.setPlatform = function(p) {
//     document.body.classList.remove('platform-ios');
//     document.body.classList.remove('platform-android');
//     document.body.classList.add('platform-' + p);
//     $scope.demo = p;
//   	}

//     $scope.addImage = function() {
//         console.log("add image");
  
//        var options = { 
//             quality : 75, 
//             destinationType : Camera.DestinationType.DATA_URL,  //Camera.DestinationType.FILE_URI 
//             sourceType : Camera.PictureSourceType.CAMERA, 
//             allowEdit : true,
//             encodingType: Camera.EncodingType.JPEG,
//             targetWidth: 400,
//             targetHeight: 400,
//             popoverOptions: CameraPopoverOptions,
//             saveToPhotoAlbum: false
//         };
 
//         $cordovaCamera.getPicture(options).then(function(imageData) {
//             $scope.imgURI = "data:image/jpeg;base64," + imageData;
//             $scope.lastPhoto = dataURItoBlob("data:image/jpeg;base64,"+imageData);
//             // $scope.picData = imgURI;

//         	$scope.$apply();
//         }, function(err) {
//             // An error occured. Show a message to the user
//         });
         

//         $cordovaFile.uploadFile("http://192.168.56.1:1337/file/upload", "/android_asset/www/img/ionic.png", options).then(function(result) {
//             console.log("SUCCESS: " + JSON.stringify(result.response));
//         }, function(err) {
//             console.log("ERROR: " + JSON.stringify(err));
//         }, function (progress) {
//             // constant progress updates
//         });

// 	}
// 	$scope.send = function() {
// 		var myImg = $scope.imgURI;
//         // var options = new FileUploadOptions();
//         // options.fileKey="post";
//         // options.chunkedMode = false;

//         var options = {
//             fileKey: "avatar",
//             fileName: "image.png",
//             chunkedMode: false,
//             mimeType: "image/png"
//         };

//         // var params = {};
//         // params.user_token = localStorage.getItem('auth_token');
//         // params.user_email = localStorage.getItem('email');
//         // options.params = params;
//         // var ft = new FileTransfer();
//         // ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
// 	}
// })

.controller('AccountCtrl', function($scope, $http, $cordovaFileTransfer, $cordovaCamera, $cordovaFile) {
	window.addEventListener('filePluginIsReady', function(){ console.log('File plugin is ready');}, false);

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
	    console.log(device.cordova);
	}

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
	   // as soon as this function is called FileTransfer "should" be defined
	   console.log(FileTransfer);
	}


	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
	   // as soon as this function is called File "should" be defined
	   console.log(File);
	}

	var ww = ""
	$scope.getPhoto = function() {
		console.log("get photo")
		options = {
			// quality : 50,
			destinationType : Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,//
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY, //Camera.PictureSourceType.CAMEA,//Camera.PictureSourceType.CAMERA, //
			targetWidth : 300,
			targetHeight : 300,
			// encodingType : 0,
			encodingType: Camera.EncodingType.JPEG,
			allowEdit : true,
			cameraDirection : 1,
			popoverOptions: CameraPopoverOptions,
      		saveToPhotoAlbum: false
		}

		$cordovaCamera.getPicture(options).then(function(imageData) {
            
            $scope.imgURI  = "data:image/jpeg;base64,"+imageData
            $scope.lastPhoto = dataURItoBlob("data:image/jpeg;base64,"+imageData);

            // $scope.$apply(); 
            // document.getElementById("newss").ng-src = imageURI
            // console.log("=================================")
            // console.log("image URI ")
            // console.log(imageURI)
            // console.log("image URI ")
            // console.log($scope.imgURI)
            // ww = imageURI
        }, function(err) {
            // An error occured. Show a message to the user
        });



	}

	$scope.getvar = function() {
		console.log(ww)
	  return ww
	};

	function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	 var byteString = atob(dataURI.split(',')[1]);
	 var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	 var ab = new ArrayBuffer(byteString.length);
	 var ia = new Uint8Array(ab);
	 for (var i = 0; i < byteString.length; i++)
	 {
	    ia[i] = byteString.charCodeAt(i);
	 }

	 var bb = new Blob([ab], { "type": mimeString });
	 return bb;
	}

	$scope.tranferFile = function() {
		console.log("tranfer file")
		// var server = "http://localhost:3000/getImage"
		// var filePath = "file:///Users/plutoshe/Library/Developer/CoreSimulator/Devices/5AEAF4FF-986B-4B2C-8A3D-A81E8EF285BD/data/Containers/Data/Application/6CA38A51-B426-4DDD-8CD0-0F30EDE729A9/tmp/cdv_photo_012.jpg"
		// $scope.imageURI
		// console.log(filePath)
		// var options = {fileKey: 'test'};
		// var options = {
		// 	fileKey : "file",
		// 	fileName : "filename.jpg",
		// 	mimeType : "image/jpeg",
		// }
		// // var options = new FileUploadOptions();
  // //       options.fileKey="post";
  // //       options.chunkedMode = false;
  //       // var params = {};
  //       // params.user_token = localStorage.getItem('auth_token');
  //       // params.user_email = localStorage.getItem('email');
  //       // options.params = params;
  //       var ft = new FileTransfer();
  //       // ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
  //       var suc = function(result) {
		// 	console.log("SUCCESS: " + JSON.stringify(result.response));
		// }
		// var lost = function(err) {
		// 	console.log("ERROR: " + JSON.stringify(err));
		// }
		// ft.upload(filePath, encodeURI(server), suc, lost, options)
		var fd = new FormData();
		fd.append('image', $scope.lastPhoto);
		// console.log($scope.lastPhoto)
		// console.log(fd)
		// var querystring = require('querystring'); 
		var req = {
			method : "POST",
			url : "http://127.0.0.1:3000/",
			port : 3000,
			path : '/getImage',
			headers:{'Content-Type':"image/jpeg"
	        },

	        data : { 
	        	image : fd
	        },

		}
		var upload_url = "http://127.0.0.1:3000/getImage"
	    $http.post(upload_url, fd, {
	        transformRequest:angular.identity,
	        headers:{'Content-Type': undefined}//"application/x-www-form-urlencoded"}
	    }).success(function(data, status, headers){
	    	console.log(status)
	    	console.log(data)
	    	console.log(headers)
	        // $scope.imageURL = data.resource_uri; //set it to the response we get
	    })
	    .error(function(data, status, headers){
	    	console.log(status)
	    })
	}
});

    // Camera.getPicture().then(function(imageURI) {
    //     console.log(imageURI);
    //     $scope.lastPhoto = imageURI;
    //     $scope.upload(); <-- call to upload the pic
    // },
    // function(err) {
    //     console.err(err);
    // }, {
    //     quality: 75,
    //     targetWidth: 320,
    //     targetHeight: 320,
    //     saveToPhotoAlbum: false
    


 //    navigator.camera.getPicture(onSuccess, onFail, { quality: 75, targetWidth: 320,
 //    targetHeight: 320, destinationType: 0 }); 
 //    //destination type was a base64 encoding
 //    function onSuccess(imageData) {
 //        //preview image on img tag
 //        $('#image-preview').attr('src', "data:image/jpeg;base64,"+imageData);
 //        //setting scope.lastPhoto 
 //        $scope.lastPhoto = dataURItoBlob("data:image/jpeg;base64,"+imageData);
 //    }
 //    function onFail(message) {
 //        alert('Failed because: ' + message);
 //    }
 //    }

	// function dataURItoBlob(dataURI) {
	// // convert base64/URLEncoded data component to raw binary data held in a string
	//  var byteString = atob(dataURI.split(',')[1]);
	//  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	//  var ab = new ArrayBuffer(byteString.length);
	//  var ia = new Uint8Array(ab);
	//  for (var i = 0; i < byteString.length; i++)
	//  {
	//     ia[i] = byteString.charCodeAt(i);
	//  }

	//  var bb = new Blob([ab], { "type": mimeString });
	//  return bb;
	// }
	// $scope.upload = function() {
	//     var url = '';
	//     var fd = new FormData();

	//     //previously I had this
	//     //angular.forEach($scope.files, function(file){
	//         //fd.append('image',file)
	//     //});

	//     fd.append('image', $scope.lastPhoto);

	//     $http.post(url, fd, {

	//         transformRequest:angular.identity,
	//         headers:{'Content-Type':"image/jpeg"
	//         }
	//     })
	//     .success(function(data, status, headers){
	//         $scope.imageURL = data.resource_uri; //set it to the response we get
	//     })
	//     .error(function(data, status, headers){

	//     })
	// }
	// $ionicPopover.fromTemplateUrl('templates/popover.html', function(popover) {
	//     $scope.popover = popover;
	//   });

 //  $scope.settings = {
 //    enableFriends: true
 //  };
 	// $scope.images = [];
 
 //    $scope.addImage = function() {
 //        console.log("add image");
 //  //   }
 
 //    $scope.urlForImage = function(imageName) {
 //        console.log("get correct path for image");
 //    }
 //    $scope.images = [];
 
	// $scope.addImage = function() {
	//  // 2
	//  	console.log("in addImage")
	// 	 // var options = {
	// 	 // destinationType : Camera.DestinationType.FILE_URI,
	// 	 // sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
	// 	 // allowEdit : false,
	// 	 // encodingType: Camera.EncodingType.JPEG,
	// 	 // popoverOptions: CameraPopoverOptions,
	// 	 // };
	// 	 var options = { 
 //            quality : 75, 
 //            destinationType : Camera.DestinationType.DATA_URL, 
 //            sourceType : Camera.PictureSourceType.CAMERA, 
 //            allowEdit : true,
 //            encodingType: Camera.EncodingType.JPEG,
 //            targetWidth: 400,
 //            targetHeight: 400,
 //            popoverOptions: CameraPopoverOptions,
 //            saveToPhotoAlbum: false
 //        };
	// 	 var file_options = {
 //            fileKey: "avatar",
 //            fileName: "image.png",
 //            chunkedMode: false,
 //            mimeType: "image/png"
 //        };
	// 	 // 3
		 // $cordovaCamera.getPicture(options).then(function(imageData) {
		 
			//  // 4
			//  onImageSuccess(imageData);
			 
			//  function onImageSuccess(fileURI) {
			//  createFileEntry(fileURI);
			//  }
			 
			//  function createFileEntry(fileURI) {
			//  window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
			//  }
			 
			//  // 5
			//  function copyFile(fileEntry) {
			//  var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			//  var newName = makeid() + name;
			 
			//  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
			//  fileEntry.copyTo(
			//  fileSystem2,
			//  newName,
			//  onCopySuccess,
			//  fail
			//  );
			//  },
			//  fail);
			//  }
			 
			//  // 6
			//  function onCopySuccess(entry) {
			//  $scope.$apply(function () {
			//  $scope.images.push(entry.nativeURL);
			//  });
			//  }
			 
			//  function fail(error) {
			//  console.log("fail: " + error.code);
			//  }
			 
			//  function makeid() {
			//  var text = "";
			//  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			 
			//  for (var i=0; i < 5; i++) {
			//  text += possible.charAt(Math.floor(Math.random() * possible.length));
			//  }
			//  return text;
			//  }
			 
		 // }, function(err) {
		 // console.log(err);
		 // });
       
 
   //      $cordovaCamera.getPicture(options).then(function(imageData) {
   //          $scope.imgURI = "data:image/jpeg;base64," + imageData;
   //      }, function(err) {
   //          // An error occured. Show a message to the user
   //      });




