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

.controller('TakephotoCtrl', function($scope, $cordovaCamera, $cordovaFile, imgURI) {

	$scope.setPlatform = function(p) {
    document.body.classList.remove('platform-ios');
    document.body.classList.remove('platform-android');
    document.body.classList.add('platform-' + p);
    $scope.demo = p;
  	}

    $scope.addImage = function() {
        console.log("add image");
  
       var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });

	}
})

.controller('AccountCtrl', function($scope, $cordovaCamera, $cordovaFile) {
	// $ionicPopover.fromTemplateUrl('templates/popover.html', function(popover) {
	//     $scope.popover = popover;
	//   });

 //  $scope.settings = {
 //    enableFriends: true
 //  };
 	// $scope.images = [];
 
    $scope.addImage = function() {
        console.log("add image");
  //   }
 
    $scope.urlForImage = function(imageName) {
        console.log("get correct path for image");
    }
    $scope.images = [];
 
	$scope.addImage = function() {
	 // 2
	 	console.log("in addImage")
		 // var options = {
		 // destinationType : Camera.DestinationType.FILE_URI,
		 // sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		 // allowEdit : false,
		 // encodingType: Camera.EncodingType.JPEG,
		 // popoverOptions: CameraPopoverOptions,
		 // };
		 var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
		 var file_options = {
            fileKey: "avatar",
            fileName: "image.png",
            chunkedMode: false,
            mimeType: "image/png"
        };
		 // 3
		 $cordovaCamera.getPicture(options).then(function(imageData) {
		 
			 // 4
			 onImageSuccess(imageData);
			 
			 function onImageSuccess(fileURI) {
			 createFileEntry(fileURI);
			 }
			 
			 function createFileEntry(fileURI) {
			 window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
			 }
			 
			 // 5
			 function copyFile(fileEntry) {
			 var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			 var newName = makeid() + name;
			 
			 window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
			 fileEntry.copyTo(
			 fileSystem2,
			 newName,
			 onCopySuccess,
			 fail
			 );
			 },
			 fail);
			 }
			 
			 // 6
			 function onCopySuccess(entry) {
			 $scope.$apply(function () {
			 $scope.images.push(entry.nativeURL);
			 });
			 }
			 
			 function fail(error) {
			 console.log("fail: " + error.code);
			 }
			 
			 function makeid() {
			 var text = "";
			 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			 
			 for (var i=0; i < 5; i++) {
			 text += possible.charAt(Math.floor(Math.random() * possible.length));
			 }
			 return text;
			 }
			 
		 }, function(err) {
		 console.log(err);
		 });
       
 
       //  $cordovaCamera.getPicture(options).then(function(imageData) {
       //      $scope.imgURI = "data:image/jpeg;base64," + imageData;
       //  }, function(err) {
       //      // An error occured. Show a message to the user
       //  });

	}
});


