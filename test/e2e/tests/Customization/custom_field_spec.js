/**
 */
var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('./../../helpers/helper.js');
var CustomFieldPage = require('./../../pages/custom_field_page.js');
var MenuPage = require('./../../pages/menuItem_page');
var PlanningPage = require('./../../pages/planning_page');
var PlanningModal = require('./../../pages/planning_modal_page');
require('../../helpers/waitReady.js');

/************************************************************************************
 *                                                                                  *
 *                               CUSTOM FIELDS                                      *
 *                                                                                  *
 ************************************************************************************/

describe('Custom Fields: ', function() {
  var loginPage;
  var menuPage;
  var customFieldPage;
  var planningPage;
  var planningModal;
  var testData = 'test_' + Date.now();

  beforeEach(function() {
    loginPage = new LoginPage();
    customFieldPage = new CustomFieldPage();
    planningPage = new PlanningPage();
    menuPage = new MenuPage();
    planningModal = new PlanningModal();

    helper.login(org_admin.username, org_admin.password);
    helper.getUrl(org_url + workspace + 'admin/customization/fields/');
    customFieldPage.createNewCustomField_button.waitReady('withRefresh');
  });

  afterEach(function() {
    helper.getUrl(org_url + workspace + 'admin/customization/fields/');
    customFieldPage.deleteAllCustomField();
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                        CUSTOM FIELDS AND THE FILTER                              *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 1595: Mark Custom Field As Filterable.', function() {

    beforeEach(function() {
      customFieldPage.createNewCustomField_button.allowAnimations(false);
      customFieldPage.createNewCustomField_button.click();
      customFieldPage.label_editBox.sendKeys(testData);
      customFieldPage.checkbox_dropdownOption.click();
      customFieldPage.story_checkbox.click();
      customFieldPage.planning_checkbox.click();
      customFieldPage.filterable_checkbox.click();
      customFieldPage.save_button.click();
      helper.getUrl(org_url + workspace + 'planning/wall/');
    });

    it('Should be able to see the new custom field in form', function() {
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.customFieldExists()).toBeTruthy();
      planningModal.close_button.waitReady();
      planningModal.close_button.click();
    });

    it('Should be able to see the new custom field in filter.', function() {
      planningPage.filter_button.waitReady('withRefresh');
      planningPage.filter_button.click();
      helper.scrollToElement(planningPage.lastFilterElement);
      expect(planningPage.customFieldExistsFilter(testData)).toBeTruthy();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                         CUSTOM FIELDS FUNCTIONALITY                              *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 1595: User should be able to modify custom field option', function() {

    beforeEach(function() {
      customFieldPage.createNewCustomField_button.allowAnimations(false);
      customFieldPage.createNewCustomField_button.click();
      helper.waitUntilPresent(customFieldPage.label_editBox);
      customFieldPage.label_editBox.sendKeys(testData);
      element(by.cssContainingText('option', 'Dropdown')).click();
      customFieldPage.dropdownValue_editBox.sendKeys('test1');
      customFieldPage.dropdownName_editBox.sendKeys('value');
      customFieldPage.dropdownAdd_button.click();
    });

    it('Should be able to delete a dropdown option on "Add Form"', function() {
      expect(customFieldPage.createdDropdownExists('test1')).toBeTruthy();
      customFieldPage.dropdownDelete_button.click();
      expect(customFieldPage.createdDropdownExists('test1')).toBeFalsy();
      customFieldPage.save_button.click();
    });

    it('Should be able to reorder dropdown options on "Add Form"', function() {
      expect(customFieldPage.getDropdownOption(0)).toBe('test1');
      customFieldPage.dropdownValue_editBox.sendKeys('test2');
      customFieldPage.dropdownName_editBox.sendKeys('value');
      customFieldPage.dropdownAdd_button.click();
      expect(customFieldPage.getDropdownOption(1)).toBe('test2');
      var dragNewColumn = customFieldPage.createdDropdownOptions.last().element(by.css('.fa.fa-ellipsis-v'));
      browser.actions().dragAndDrop(dragNewColumn, {x:0, y:-50}).perform();
      browser.sleep(1000);//finish drag and drop
      expect(customFieldPage.getDropdownOption(0)).toBe('test2');
      customFieldPage.save_button.click();
    });

    it('Should be able to delete a dropdown option on "Split view"', function() {
      expect(customFieldPage.getDropdownOption(0)).toBe('test1');
      customFieldPage.save_button.click();
      customFieldPage.openSplitView(testData);
      expect(customFieldPage.createdDropdownExistsSplitView('test1')).toBeTruthy();
      customFieldPage.dropdownDelete_button_SplitView.click();
      expect(customFieldPage.createdDropdownExistsSplitView('test1')).toBeFalsy();
    });

    it('Should be able to reorder dropdown options on "Split view"', function() {
      expect(customFieldPage.getDropdownOption(0)).toBe('test1');
      customFieldPage.dropdownValue_editBox.sendKeys('test2');
      customFieldPage.dropdownName_editBox.sendKeys('value');
      customFieldPage.dropdownAdd_button.click();
      expect(customFieldPage.getDropdownOption(1)).toBe('test2');
      customFieldPage.save_button.click();
      customFieldPage.openSplitView(testData);
      expect(customFieldPage.getDropdownOptionSplitView(0)).toBe('test1');
      var dragNewColumn = customFieldPage.createdDropdownOptionsDetails.last().element(by.css('.fa.fa-ellipsis-v'));
      browser.actions().dragAndDrop(dragNewColumn, {x:0, y:-50}).perform();
      browser.sleep(1000);//finish drag and drop
      expect(customFieldPage.getDropdownOptionSplitView(1)).toBe('test1');
    });
  });

});
