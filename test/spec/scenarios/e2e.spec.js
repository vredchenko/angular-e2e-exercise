describe('Number Game', function() {

  it('should display game rules to the user', function() {
  	browser.get('http://localhost:9000');
  	expect( true ).toEqual( false );
  });

  it('should show ten numbers', function() {
    browser.get('http://localhost:9000');

    // element(by.model('todoText')).sendKeys('write a protractor test');
    // element(by.css('[value="add"]')).click();

    var numbers = element.all( by.repeater('number in numbers') );

    expect( numbers.count() ).toEqual( 10 );
    // expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
});