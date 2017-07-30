angular.module('reg')
  .controller('ListingCtrl', [
    '$rootScope',
    '$scope',
    '$sce',
    'currentUser',
    'settings',
    'Utils',
    'ListingService',
    'EVENT_INFO',
    'DASHBOARD',
    function($rootScope, $scope, $sce, currentUser, settings, Utils, ListingService, DASHBOARD){

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
    }]);
