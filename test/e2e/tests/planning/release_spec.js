var org_user = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');
var CommonPage = require('./../../pages/common_item_page');
var PlanningPage = require('./../../pages/planning_page');
var PlanningModalPage = require('./../../pages/planning_modal_page');
var DeliveryPage = require('./../../pages/delivery_page.js');
var ReleasePage = require('./../../pages/release_page');
require('../../helpers/waitReady.js');

describe('Release Page: ', function() {
  var loginPage;
  var menuPage;
  var commonPage;
  var planningPage;
  var planningModal;
  var releasePage;
  var deliveryPage;
  var releaseName;
  var testCaseName;

  beforeEach(function() {
    loginPage = new LoginPage();
    menuPage = new MenuPage();
    commonPage = new CommonPage();
    planningPage = new PlanningPage();
    planningModal = new PlanningModalPage();
    releasePage = new ReleasePage();
    deliveryPage = new DeliveryPage();
    releaseName = 'release' + Date.now();
    testCaseName = 'case' + Date.now();
    helper.login(orgAdmin.username, orgAdmin.password);
    helper.getUrl(org_url + workspace + 'planning/releases/');
  });

  afterEach(function() {
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                              Release Components                                  *
   *                                                                                  *
   ************************************************************************************/

  describe('Release Components', function() {

    beforeEach(function() {
      releasePage.addRelease(releaseName);
      releasePage.addReleaseButton.waitReady();
      releasePage.clickOnRelease(releaseName);
    });

    afterEach(function() {
      releasePage.deleteFirstRelease();
    });

    it('Should be able to see release variables in the split view', function() {
      releasePage.description.waitReady();
      expect(releasePage.description.getText()).toBe('My Description');
      expect(releasePage.dateRange.getText()).toContain('2016');
      expect(releasePage.techLead.getText()).toBe('Org Admin');
      expect(releasePage.projectManager.getText()).toBe('Org Admin');
      expect(releasePage.AISName.getAttribute('value')).toBe('Name');
    });

    it('Should not save if all of the release fields do not have data in them', function() {
      releasePage.description.waitReady();
      releasePage.description.click();
      releasePage.descriptionEdit.clear();
      releasePage.dateRange.click();//save the new description
      releasePage.dateRange.click();//open date range edit popover
      releasePage.clearDateEnd.click();
      releasePage.clearDateStart.click();
      browser.sleep(1500);//need to wait for date to save
      releasePage.dateRange.click();//save cleared date range
      releasePage.clearProjectManager.click();
      releasePage.clearTechLead.click();
      releasePage.AISName.clear();
      releasePage.clickOnRelease(releaseName);//close split view to save the edited fields
      releasePage.clickOnRelease(releaseName);//reopen the split view to check if everything saved
      releasePage.description.waitReady();
      expect(releasePage.description.getText()).toBe('My Description');
      expect(releasePage.dateRange.getText()).toContain('2016');
      expect(releasePage.techLead.getText()).toBe('Org Admin');
      expect(releasePage.projectManager.getText()).toBe('Org Admin');
      expect(releasePage.AISName.getAttribute('value')).toBe('Name');
    });

    it('REQ 2916: Should be able to edit release variables in the split view', function() {
      releasePage.description.waitReady();
      releasePage.description.click();
      releasePage.descriptionEdit.clear();
      releasePage.descriptionEdit.sendKeys('NEW DESCRIPTION');
      releasePage.dateRange.click();//save the new description
      releasePage.dateRange.click();//open date range edit popover
      releasePage.clearDateEnd.click();
      releasePage.clearDateStart.click();
      browser.sleep(1500);//need to wait for date to save
      releasePage.dateRange.click();//save cleared date range
      releasePage.addDateSplitView();
      releasePage.clearProjectManager.click();
      releasePage.projectManagerBox.click();
      releasePage.projectManagerBox.sendKeys('Org User');
      releasePage.projectManagerDropdown.click();
      releasePage.clearTechLead.click();
      releasePage.techLeadBox.click();
      releasePage.techLeadBox.sendKeys('Org User');
      releasePage.techLeadDropdown.click();
      releasePage.AISName.clear();
      releasePage.AISName.sendKeys('NEW AIS NAME');
      releasePage.clickOnRelease(releaseName);//close split view to save the edited fields
      releasePage.clickOnRelease(releaseName);//reopen the split view to check if everything saved
      releasePage.description.waitReady();
      expect(releasePage.description.getText()).toBe('NEW DESCRIPTION');
      expect(releasePage.dateRange.getText()).toContain('2016');
      expect(releasePage.techLead.getText()).toBe('Org User');
      expect(releasePage.projectManager.getText()).toBe('Org User');
      expect(releasePage.AISName.getAttribute('value')).toBe('NEW AIS NAME');

    });

    it('REQ 2881: Should be able to add a component to a release in the split view', function() {
      releasePage.componentTab.waitReady();
      releasePage.componentTab.click();
      releasePage.addComponentButton.waitReady();
      releasePage.addComponentButton.click();
      releasePage.componentTitleBox.waitReady();
      releasePage.componentTitleBox.sendKeys('componentTitle');
      releasePage.componenetVersionBox.sendKeys('componentVersion');
      releasePage.componenetSourceURLBox.sendKeys('componentSource');
      releasePage.componentDestinationURLBox.sendKeys('componentDestination');
      releasePage.componenetGroupIDBox.sendKeys('componentGroupID');
      releasePage.componentArtifactIDBox.sendKeys('componentArtifactID');
      releasePage.saveButton.click();
      releasePage.componentTitle.waitReady();
      expect(releasePage.components.count()).toBe(1);
      expect(releasePage.componentTitle.getText()).toBe('componentTitle');
      expect(releasePage.componentVersion.getText()).toContain('componentVersion');
      expect(releasePage.componentSourceURL.getText()).toBe('componentSource');
      expect(releasePage.componentDestinationURL.getText()).toBe('componentDestination');
      expect(releasePage.componentGroupID.getText()).toContain('componentGroupID');
      expect(releasePage.componentArtifactID.getText()).toContain('componentArtifactID');
    });

    it('REQ 2881: Should be able to delete a component in the split view', function() {
      releasePage.componentTab.waitReady();
      releasePage.componentTab.click();
      releasePage.addComponentButton.waitReady();
      releasePage.addComponentButton.click();
      releasePage.componentTitleBox.waitReady();
      releasePage.componentTitleBox.sendKeys('componentTitle');
      releasePage.componenetVersionBox.sendKeys('componentVersion');
      releasePage.componenetSourceURLBox.sendKeys('componentSource');
      releasePage.componentDestinationURLBox.sendKeys('componentDestination');
      releasePage.componenetGroupIDBox.sendKeys('componentGroupID');
      releasePage.componentArtifactIDBox.sendKeys('componentArtifactID');
      releasePage.saveButton.click();
      releasePage.componentTitle.waitReady();
      expect(releasePage.components.count()).toBe(1);
      browser.actions().mouseMove(releasePage.componentTitle).perform();
      releasePage.deleteComponent.waitReady();
      releasePage.deleteComponent.click();
      releasePage.deleteConfirm.waitReady();
      releasePage.deleteConfirm.click();
      releasePage.addComponentButton.waitReady();
      expect(releasePage.components.count()).toBe(0);
    });

    it('REQ 2874: Should be able to add a component to a pipeline', function() {
      releasePage.componentTab.waitReady();
      releasePage.componentTab.click();
      releasePage.addComponentButton.waitReady();
      releasePage.addComponentButton.click();
      releasePage.componentTitleBox.waitReady();
      releasePage.componentTitleBox.sendKeys('componentTitle');
      releasePage.componenetVersionBox.sendKeys('componentVersion');
      releasePage.componenetSourceURLBox.sendKeys('componentSource');
      releasePage.componentDestinationURLBox.sendKeys('componentDestination');
      releasePage.componenetGroupIDBox.sendKeys('componentGroupID');
      releasePage.componentArtifactIDBox.sendKeys('componentArtifactID');
      releasePage.saveButton.click();
      menuPage.delivery_menuItem.waitReady('withRefresh');
      menuPage.delivery_menuItem.click();
      commonPage.addButton.click();
      deliveryPage.pipelineReleaseDropdown.waitReady();
      deliveryPage.pipelineReleaseDropdown.click();
      element(by.cssContainingText('.ui-select-choices-row', releaseName)).click();
      deliveryPage.componentReleaseDropdown.click();
      element(by.cssContainingText('.ui-select-choices-row.active', 'componentTitle')).click();
      deliveryPage.pipelineTitleBox.sendKeys('componentTestPipe');
      deliveryPage.save_button.click();
      element(by.cssContainingText('a.caption-subject.font-blue-hoki', 'componentTestPipe')).waitReady();
      element(by.cssContainingText('a.caption-subject.font-blue-hoki', 'componentTestPipe')).click();
      element(by.linkText('Configure Pipeline')).waitReady();
      element(by.linkText('Configure Pipeline')).click();
      deliveryPage.editPipelineButton.waitReady();
      deliveryPage.editPipelineButton.click();
      deliveryPage.pipelineTitleBox.waitReady();
      expect(element.all(by.binding('$select.selected.title')).get(1).getText()).toBe('componentTitle');
      element(by.buttonText('Cancel')).click();
      deliveryPage.deletePipeline();
      helper.getUrl(org_url + workspace + 'planning/releases/');
    });

  });

  /************************************************************************************
   *                                                                                  *
   *                             RELEASES > TESTING                                   *
   *                                                                                  *
   ************************************************************************************/

  describe('Planning Releases Detail Testing Tab: ', function() {

    beforeEach(function() {
      releasePage.addRelease(releaseName);
      releasePage.addReleaseButton.waitReady();
      releasePage.clickOnRelease(releaseName);
      releasePage.releaseDetailTestingTab.waitReady();
      releasePage.releaseDetailTestingTab.click();
      releasePage.addTestCaseButton.waitReady();
    });

    afterEach(function() {
      releasePage.deleteFirstRelease();
    });

    it('Should be able to add a test case', function() {
      expect(browser.isElementPresent(releasePage.addTestCaseButton)).toBeTruthy();
      releasePage.addTestCase(testCaseName);
      expect(browser.isElementPresent(releasePage.downloadTestPlanLink)).toBeTruthy();
    });

    it('Should be able to add test steps when editing a test case', function() {
      expect(browser.isElementPresent(releasePage.addTestCaseButton)).toBeTruthy();
      releasePage.addTestCase(testCaseName);
      releasePage.addTestStep('Passed');
      releasePage.testModalSave.click();
      releasePage.downloadTestPlanLink.waitReady();
      expect(releasePage.testCaseCountColumn.getText()).toBe('1 step');
    });

    it('Should set the icon to a check if all steps passed in a case.', function() {
      expect(browser.isElementPresent(releasePage.addTestCaseButton)).toBeTruthy();
      releasePage.addTestCase(testCaseName);
      releasePage.addTestStep('Passed');
      expect(browser.isElementPresent(releasePage.testCaseStepPass)).toBeTruthy();
      releasePage.testModalSave.click();
      releasePage.downloadTestPlanLink.waitReady();
      expect(browser.isElementPresent(releasePage.testCasePassColumn)).toBeTruthy();
    });

    it('Should set the icon to an x if one step failed in a case.', function() {
      expect(browser.isElementPresent(releasePage.addTestCaseButton)).toBeTruthy();
      releasePage.addTestCase(testCaseName);
      releasePage.addTestStep('Failed');
      expect(browser.isElementPresent(releasePage.testCaseStepFail)).toBeTruthy();
      releasePage.testModalSave.click();
      releasePage.downloadTestPlanLink.waitReady();
      expect(browser.isElementPresent(releasePage.testCaseFailColumn)).toBeTruthy();
    });

    it('Should be able to edit a test case.', function() {
      expect(browser.isElementPresent(releasePage.addTestCaseButton)).toBeTruthy();
      releasePage.addTestCase(testCaseName);
      var prevName = releasePage.testCaseNameColumn.getText();
      releasePage.editTestCase('_edited');
      expect(releasePage.testCaseNameColumn.getText()).not.toEqual(prevName);
    });
  });

});
