'use strict';

// Organise SPA-related stuff
var GamePage = function() {

  // DOM element selectors
  this.numbers        = element.all( by.repeater('number in numbers') );
  this.gameRules      = element( by.css('.game-instructions') );
  this.defeatMessage  = element( by.css('.game-over') );
  this.victoryMessage = element( by.css('.victory') );
  
  this.loadSPA = function() {
    browser.get( 'http://127.0.0.1:9000' );
  };

  // Build a frequency distribution of numbers within the list.
  this.buildFreqDist = function( numberArray ) {
    var freqDist = {};
    numberArray.forEach(function( num ) {
      if ( !(num in freqDist) ) {
        freqDist[num] = 1;
      } else {
        freqDist[num] += 1;
      }
    });
    return freqDist;
  };

  // Does the current number list have duplicates?
  this.hasDuplicates = function( numberArray ) {
    var fDist = this.buildFreqDist( numberArray );
    for ( var k in fDist ) {
      if ( fDist[k] > 1 ) return true;
    }
    return false;
  };

  // Returns an array of unique numbers in list
  this.getUniqueNumbers = function() {
    var fDist = this.buildFreqDist( numberArray )
    ,   uniq  = []
    ;
    for ( var k in fDist ) {
      if ( fDist[k] === 1 ) uniq.push( k );
    }
    return uniq;
  };
};

// Emulate a player interacting with an SPA
var GamePlayer = function( page ) {
  this.spa = page;

  this.removeOneDuplicateNumber = function() {
    // find a duplicate and click on it
  };

  

  this.playToWin = function() {
    // successful gameplay scenario here
    while ( page.hasDuplicates() ) {
      this.removeOneDuplicateNumber();
    }
  };

  // Keep clicking until defeat
  this.playToLoose = function() {
    this.spa.numbers.each( function( button ) {
      button.isEnabled().then(function( bEnabled ) {
        // http://seleniumhq.org/exceptions/stale_element_reference.html
        // @ToDo Stale element problem
        if ( bEnabled ) button.click();
      });
    });
  };
};



describe('Number Game', function() {

  var page    = new GamePage()
  ,   player  = new GamePlayer(page)
  ;

  beforeEach(function() {
    page.loadSPA();
  });

  it('should display game rules to the user', function() {
    /*
      @DevNote 
      I have my doubts if checking for an exact string match is flexible
      enough for elements with static copy - changes in text could lead 
      to test suite maintainability challenges for larger projects.

      This particular test merely ensures a container
      element exists and is non-empty, meaning that container contents can be 
      updated without breaking the test.
      
      Another option would be to use a RegEx looking for a chunk of text that's 
      unlikely to be paraphrased.
      
      Better still we could maintain a corpora of static copy separately from
      our code base and insert it into both the system and test suites before each
      serve/build/test.
    */

    page.gameRules.getText().then(function( text ) {
      expect( text.length ).toBeGreaterThan( 0 );
    });
  });

  it('should display ten numbers with some duplicates', function() {
    expect( page.numbers.count() ).toEqual( 10 );

    page.numbers.map(function( el ) {
      return el.getText();
    })
    .then(function( numberArray ) {
      expect( page.hasDuplicates( numberArray ) ).toEqual( true );
    }); 
  });

  it('should recognise and communicate a defeat state', function() {
  	player.playToLoose( page );
    page.defeatMessage.getText().then(function( text ) {
      expect( text.length ).toBeGreaterThan( 0 );
    });
  });

  // it('should recognise and communicate a victory state', function() {
  // 	expect( true ).toEqual( false );
  // });

});