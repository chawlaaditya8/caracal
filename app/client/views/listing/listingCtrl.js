angular.module('reg')
  .controller('ListingCtrl', [
    '$rootScope',
    '$scope',
    '$location',
    '$sce',
    'currentUser',
    'settings',
    'Utils',
    'ListingService',
    'EVENT_INFO',
    'DASHBOARD',
    function($rootScope, $scope, $location, $sce, currentUser, settings, Utils, ListingService, DASHBOARD){

      // Semantic-UI moves modal content into a dimmer at the top level.
      // While this is usually nice, it means that with our routing will generate
      // multiple modals if you change state. Kill the top level dimmer node on initial load
      // to prevent this.
      $('.ui.dimmer').remove();
      // Populate the size of the modal for when it appears, with an arbitrary user.
      $scope.selectedEvent = {};
    
      $scope.event = 
      ListingService
        .getAll()
        .success(function(data){
          $scope.events = data;
        });
      $scope.selectEvent = function(event){
        console.log("test");
        console.log(event);
        $scope.selectedEvent = event;
        $('.event.modal')
          .modal('show');
      }
       
      
    // Using $location service
    var url = $location.path().split('/');
    console.log(url);
    var firstParameter = url[2];
    var secondParameter = url[3];
    console.log(firstParameter);

   
    
    function getById(arr, _id) {
        for (var d = 0, len = arr.length; d < len; d += 1) {
            if (arr[d]._id === _id) {
                return arr[d];
            }
        }
    }
    
    var eve = getById($scope.event, firstParameter);

    console.log(eve);
        $scope.selectedEvent = eve;
        $('.eve.modal')
          .modal('show');

    
    }]);
