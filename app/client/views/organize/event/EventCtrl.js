angular.module('reg')
  .controller('EventCtrl', [
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
      $scope.createEvent = function() {
        var title = $scope.title;
        var description = $scope.description;
        console.log(title, description);
        ListingService.createEvent(title, description);
        $location.path('/organize');
      };

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
          console.log(errFiles[0]);
        if (file) {
          $scope.imgPreview = file.$ngfBlobUrl; 
          console.log(file.$ngfBlobUrl);
            // file.upload = Upload.upload({
            //     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            //     data: {file: file}
            // });

            // file.upload.then(function (response) {
            //     $timeout(function () {
            //         file.result = response.data;
            //     });
            // }, function (response) {
            //     if (response.status > 0)
            //         $scope.errorMsg = response.status + ': ' + response.data;
            // }, function (evt) {
            //     file.progress = Math.min(100, parseInt(100.0 * 
            //                              evt.loaded / evt.total));
            // });
        }   
    }
    }
  ]);
