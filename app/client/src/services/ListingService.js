angular.module('reg')
  .factory('ListingService', [
  '$http',
  'Session',
  function($http, Session){

    var base = '/api/';

    return {

      // ----------------------
      // Basic Actions
      // ----------------------
      // getCurrentUser: function(){
      //   return $http.get(base + Session.getUserId());
      // },

      // get: function(id){
      //   return $http.get(base + id);
      // },

      getAll: function(){
        return $http.get(base + 'events');
      },

      getMine: function(){
        return $http.get(base + 'myevents');
      }
    };
  }
  ]);
