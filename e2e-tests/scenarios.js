'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  it('should redirect `index.html` to `http://localhost:8000/#!/', function() {
    browser.get('http://localhost:8000/#!/');
    expect(browser.getLocationAbsUrl()).toBe('/');
  });

  describe('View: Phone list', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/#!/');
    });
	
	//Testing <input> Field
    it('should filter the phone list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
      var query = element(by.model('$ctrl.searchInput'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('dell');
      expect(phoneList.count()).toBe(2);
 
      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });

	//Testing <select> menu
    it('should be possible to control phone order via the drop-down menu', function() {
      var queryField = element(by.model('$ctrl.searchInput'));
      var orderSelect = element(by.model('$ctrl.filter'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var phoneNameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

      function getNames() {
        return phoneNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Motorola XOOM\u2122 with Wi-Fi',
        'MOTOROLA XOOM\u2122'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'MOTOROLA XOOM\u2122',
        'Motorola XOOM\u2122 with Wi-Fi'
      ]);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('$ctrl.searchInput'));
      query.sendKeys('nexus');

      element.all(by.css('.phones-container div a')).first().click(); //Get the first() matched Element and Emulate the click() on it
      expect(browser.getLocationAbsUrl()).toBe('/phone-detail/nexus-s');
    });

  });

  describe('View: Phone detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/phone-detail/nexus-s');
    });

    it('should display the `nexus-s` page', function() {
      expect(element(by.binding('$ctrl.phone.name')).getText()).toBe('Nexus S');
    });
	
	it('should display the `nexus-s` page 4 pictures', function() 
	{
      var pics = element.all(by.repeater('img in $ctrl.phone.images'));
	  expect(pics.count()).toBe(4); 
	  pics.each(function(element, index) 
	  {
	// Will go threw 0 First, 1 Second, 2 Third.
		expect(element.isDisplayed()).toBe(true);
	  });
	});
	
    it('should display the first phone image as the main phone image', function() {
      var mainImage = element(by.css('phone-image-img'));

      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });

    it('should swap the main image when clicking on a thumbnail image', function() {
      var mainImage = element(by.css('phone-image-img'));
      var thumbnails = element.all(by.css('thumbnails img'));

      thumbnails.get(2).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

      thumbnails.get(0).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });

  });

});
