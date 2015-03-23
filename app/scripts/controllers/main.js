'use strict';

/**
 * @ngdoc function
 * @name numberDuplicatesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the numberDuplicatesApp
 */
angular.module('numberDuplicatesApp')
  .controller('MainCtrl', function ($scope, numberListService) {

    // Note: for a real project data retrieval, operations over that data
    // and non-UI business logic should be abstracted away into providers. 

    $scope.numbers = [];
    numberListService.get().$promise.then(function(response) {
      $scope.numbers = response;
    });
    
    // Game state
    $scope.gameOngoing  = true;
    $scope.defeated     = false;
    $scope.victorious   = false;

    $scope.playerMove = function( index ) {
    	
      if ( $scope.hasDuplicates( $scope.numbers[index] ) ) {
        $scope.numbers.splice( index, 1 );
      } else {
        $scope.gameOngoing  = false;
        $scope.defeated     = true;
      }

      if ( $scope.reachedVictoryGameState() ) {
        $scope.gameOngoing  = false;
        $scope.victorious   = true; 
      }
    };

    $scope.hasDuplicates = function( number ) {
      return angular.copy( $scope.numbers ).filter( function( value ) {
        return value === number;
      }).length > 1;
    };

    // Would be a one-liner using lodash
    $scope.reachedVictoryGameState = function() {
      var result = [];
      $scope.numbers.forEach( function( value ) {
        if( result.indexOf( value ) === -1) {
          result.push( value );
        }
      });
      return result.length === $scope.numbers.length;
    };

  });
