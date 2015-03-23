var NumberGamePage = function() {
  this.numbers = element.all( by.repeater('number in numbers') );
  this.gameRules = element( by.css('.game-instructions') );

  this.get = function() {
    browser.get( 'http://127.0.0.1:9000' );
  };

  // Does the current number set have duplicates?
  this.hasDuplicates = function() {
    return true;
  };

  this.getUniqueNumbers = function() {
    return [1,2,3];
  };

  this.removeOneDuplicateNumber = function() {
    // find a duplicate and click on it
  };

  this.removeOneUniqueNumber = function() {
    while ( !this.getUniqueNumbers().length ) {
      this.removeOneDuplicateNumber();
    }

    var unique = this.getUniqueNumbers();
    // remove one of the unique numbers
  };

  this.playToWin = function() {
    // successful gameplay scenario here
    while ( this.hasDuplicates() ) {
      this.removeOneDuplicateNumber();
    }
  };

  this.playToLoose = function() {
    // remove a unique number to trigger defeat
    this.removeOneUniqueNumber();
  };
};

describe('Number Game', function() {

  var numbers = element.all( by.repeater('number in numbers') );

  var SPA = new NumberGamePage();
  
  // var freqDistr = {}; // Count duplicates
  // var hasDuplicates = function( numbers ) {
  //   // ToDo
  //   return true;
  // };

  beforeEach(function() {
    browser.get('http://127.0.0.1:9000');
  });

  it('should display game rules to the user', function() {
    // I have my doubts if checking for an exact string match is flexible
    // enough for elements with static copy - changes in text could lead 
    // to test suite maintainability challenges for big projects.
    // This particular test merely ensures a container
    // element exists and is non-empty, which is good enough for my purposes here.
    // Another option would be to use a RegEx looking for a chunk of text that's 
    // unlikely to be paraphrased.
    // A yet another alternative is to maintain a corpora of static copy seprately
    // which would ensure data integrity between the app and the test suite.
    // Needs further research.. 
    expect( element( by.css('.game-instructions') ).getText() ).toBeTruthy();
  });

  it('should display ten numbers with some duplicates', function() {
    expect( numbers.count() ).toEqual( 10 );
    // expect( hasDuplicates( numbers ) ).toEqual( true );
  });

  it('should recognise and communicate a defeat state', function() {
  	expect( true ).toEqual( false );
  });

  it('should recognise and communicate a victory state', function() {
  	expect( true ).toEqual( false );
  });

});