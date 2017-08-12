angular.module('reg')
  .controller('EventCtrl', [
    '$scope',
    '$http',
    '$state',
    'Utils',
    'ListingService',
    '$location',
    'Upload',
    function($scope, $http, $state, Utils, ListingService, $location, Upload){
      $scope.title = "";
      $scope.description = "";
      $scope.imgPreview = "https://semantic-ui.com/images/wireframe/image.png";

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
          console.log(errFiles[0]);
        if (file) {
          $scope.imgPreview = file.$ngfBlobUrl; 
          console.log(file.$ngfBlobUrl);
        }   
    }
    
      $scope.createEvent = function() {
        var title = $scope.title;
        var description = $scope.description;
        console.log(title, description, $scope.f);
        ListingService.createEvent(title, description, $scope.f);
        $location.path('/organize');
      };

    }
  ]);
