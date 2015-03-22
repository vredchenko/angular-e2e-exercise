'use strict';

/**
 * @ngdoc function
 * @name numberDuplicatesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the numberDuplicatesApp
 */
angular.module('numberDuplicatesApp')
  .controller('MainCtrl', function ($scope) {

    $scope.numbers = [1,1,2,2,3,3,4,4,5,5];
    
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

    // Would be a one-liner using lo-dash
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
