angular.module('reg')
  .controller('editEventCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'ListingService',
    '$location',
    'Upload',
    function($scope, $http, $state, settings, Utils, ListingService, $location, Upload){
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
    
      $scope.modifyEvent = function() {
        var temptitle= $scope.title;
        var title = temptitle;
        var tempdescription=$scope.description;
        var description = tempdescription;
        console.log(title, description, $scope.f);
        ListingService.modifyEvent(temptitle, tempdescription, title, description, $scope.f);
        $location.path('/organize');
      };

    }
  ]);
