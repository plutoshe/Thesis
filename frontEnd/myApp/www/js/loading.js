angular.module('LoadingApp', ['ionic'])
.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
});




.controller('HomeTabCtrl', function($scope, $ionicPopover) {
//  console.log('HomeTabCtrl');
  
   $ionicPopover.fromTemplateUrl('popover.html', function(popover) {
    $scope.popover = popover;
  });
})

.controller('MainCtrl', function($scope, $ionicPopover) {
  console.log('MainCtrl');
  
   $ionicPopover.fromTemplateUrl('popover.html', function(popover) {
    $scope.popover = popover;
  });
});