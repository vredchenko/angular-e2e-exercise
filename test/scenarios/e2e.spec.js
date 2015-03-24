'use strict';

// Group SPA-related stuff
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
  this.buildFreqDist = function( numberArray ) { // ToDo memoziation
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
  this.hasDuplicates = function( numberArray ) { // ToDo memoziation
    var fDist = this.buildFreqDist( numberArray );
    for ( var k in fDist ) {
      if ( fDist[k] > 1 ) return true;
    }
    return false;
  };

  // Returns an array of unique numbers in list
  this.getUniqueNumbers = function( numberArray ) { // ToDo memoziation
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

  this.clickNumber = function( integerValue ) {
    // find the first occurance of integerValue and eliminate it.
    element(by.css('[value="' + integerValue + '"]')).click();
    // console.log( 'clicked a button with number: ' + integerValue );
  };

  this.playToWin = function( numberArray ) {
    var fDist         = this.spa.buildFreqDist( numberArray )
    ,   gamePlan      = {}
    ,   number        = null
    ;
    // Decrementing each key gets us a model of how many time to click each number
    for ( number in fDist ) {
      gamePlan[number] = fDist[number] - 1;
    }
    // console.log( 'the game plan is: ', gamePlan );
    for ( number in gamePlan ) {
      for ( var i=0; i < gamePlan[number]; i++ ) {
        this.clickNumber( number );  
      }
    }
  };

  this.playToLoose = function( numberArray ) {
    var fDist         = this.spa.buildFreqDist( numberArray )
    ,   pickedNumber  = null
    ;
    // Of 10 ranom numbers 1:5 we are guaranteed to have duplicates.
    // We are not guaranteed to have a unique number, 
    // but if we do - it's enough to eliminate it to reach a defeat state.
    if ( this.spa.getUniqueNumbers( numberArray ).length ) {
      // console.log( 'list has at least one unique number', fDist );
      pickedNumber = this.spa.getUniqueNumbers( numberArray )[0];
    }
    // Otherwise all numbers have duplicates - pick one and keep elminating it.
    else {
      // console.log( 'all numbers in array are duplicates', fDist );
      pickedNumber = Object.keys( fDist )[0];
    }
    // console.log( 'picked: ' + pickedNumber );
    for (var i=0; i < fDist[pickedNumber]; i++) {
      this.clickNumber( pickedNumber );
    }
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
      return el.getAttribute('value');
    })
    .then(function( numberArray ) {
      expect( page.hasDuplicates( numberArray ) ).toEqual( true );
    }); 
  });

  it('should recognise and communicate a defeat state', function() {
  	page.numbers.map(function( el ) {
      return el.getAttribute('value');
    })
    .then(function( numberArray ) {
      player.playToLoose( numberArray );
    });

    page.defeatMessage.getText().then(function( text ) {
      expect( text.length ).toBeGreaterThan( 0 );
    });  
    
  });

  it('should recognise and communicate a victory state', function() {
  	page.numbers.map(function( el ) {
      return el.getAttribute('value');
    })
    .then(function( numberArray ) {
      player.playToWin( numberArray );
    });

    page.victoryMessage.getText().then(function( text ) {
      expect( text.length ).toBeGreaterThan( 0 );
    });
  });

});