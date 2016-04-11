var org_user = browser.params.users.orgUser;
var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var PlanningPage = require('./../../pages/planning_page.js');
var PlanningModalPage = require('./../../pages/planning_modal_page');
var PlanningBacklogPage = require('./../../pages/planning_backlog_page.js');
var MenuPage = require('./../../pages/menuItem_page.js');
var CommonPage = require('./../../pages/common_item_page.js');
var ConfigurationPage = require('./../../pages/configurations_page.js');
var ReleasePage = require('./../../pages/release_page.js');
var helper = require('../../helpers/helper.js');
require('../../helpers/waitReady.js');

/************************************************************************************
 *                                                                                  *
 *                       BASIC ORG/ADMIN ACCESS CHECKS                              *
 *                                                                                  *
 ************************************************************************************/

describe('REQ 0000: Org access: ', function() {
  var menuPage;

  beforeEach(function() {
    menuPage = new MenuPage();
    helper.login(org_admin.username, org_admin.password);
  });

  afterEach(function() {
    helper.logout();
  });

  xdescribe('As Admin: ', function() {

    beforeEach(function() {
      helper.login(org_admin.username, org_admin.password);
    });

    it('Should be able to see Workspace Admin cog menu option', function() {
      expect(browser.isElementPresent(menuPage.adminCog_icon)).toBeTruthy();
    });

    it('Should be able to see the Admin cog on page header', function() {
      helper.getUrl(org_url + workspace);
      expect(browser.isElementPresent(menuPage.workspaceAdmin_menuItem)).toBeTruthy();
    });

  });

  xdescribe('As User :', function() {

    beforeEach(function() {
      helper.login(org_user.username, org_user.password);
    });

    it('Should not be able to see Workspace Admin cog menu option', function() {
      expect(browser.isElementPresent(menuPage.adminCog_icon)).toBeFalsy();
    });

    it('Should not be able to see the Admin cog on page header', function() {
      helper.getUrl(org_url + workspace);
      expect(browser.isElementPresent(menuPage.workspaceAdmin_menuItem)).toBeFalsy();
    });

  });
});

/************************************************************************************
 *                                                                                  *
 *               ORG ADMIN PERMISSION CHECKS ON CUSTOMIZABLE VALUES                 *
 *                                                                                  *
 ************************************************************************************/

describe('As an org admin I want to: ', function() {
  var planningPage;
  var planningModal;
  var planningBacklog;
  var menuPage;
  var commonPage;
  var configurationsPage;
  var releasePage;
  var newStoryName = 'NewStory_' + helper.getRandomNumber(5);

  var tagName = 'zzzzz';
  var featureName = 'zzzzz';
  var releaseName = 'zzzzz' + '_release';

  beforeEach(function() {
    planningPage = new PlanningPage();
    planningModal = new PlanningModalPage();
    planningBacklog = new PlanningBacklogPage();
    menuPage = new MenuPage();
    commonPage = new CommonPage();
    configurationsPage = new ConfigurationPage();
    releasePage = new ReleasePage();

    helper.login(org_admin.username, org_admin.password);
    helper.getUrl(org_url + workspace + 'planning/wall/');
    planningPage.addStoryButton.waitReady('withRefresh');
    planningPage.addStoryButton.click();
    planningModal.title.waitReady();
    planningModal.title.sendKeys(newStoryName);
  });

  afterEach(function() {
    helper.getUrl(org_url + workspace + 'planning/');
    planningBacklog.clearBacklog();
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                       STORY TAG EDIT/DELETE/ADD CHECKS                           *
   *                                                                                  *
   ************************************************************************************/

  //@Todo need to add tests for tags on story tasks
  describe('REQ 2041: Delete, edit, or add tags on stories: ', function() {
    beforeEach(function() {
      planningModal.tags.click();
      browser.actions().sendKeys(tagName, protractor.Key.ENTER).perform();
      planningModal.save_button.click();
      browser.sleep(1000);//wait for story to save
      helper.getUrl(org_url + workspace + 'admin/configuration/general/');
    });

    it('Should be able to edit a tag.', function() {
      configurationsPage.editTagName(tagName + '_updated');
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.clickStoryCard(0);
      expect(browser.isElementPresent(element(by.
        cssContainingText('span.ng-binding', tagName + '_updated')))).toBeTruthy();
      helper.getUrl(org_url + workspace + 'admin/configuration/general/');
      configurationsPage.deleteTag();
    });

    it('Should be able to delete a tag.', function() {
      configurationsPage.deleteTag();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.clickStoryCard(0);
      expect(browser.isElementPresent(element(by.cssContainingText('span.ng-binding', tagName)))).toBeFalsy();
    });

    it('Should be able to receive delete message while deleting a tag.', function() {
      var tag = element.all(by.repeater('tag in general.tags')).get(0);
      browser.actions().mouseMove(tag.element(by.model('tag.text'))).perform();
      tag.element(by.css('[uib-tooltip="Delete"]')).click();
      var deleteMessage = 'Deleting this tag will remove it from all' +
        ' objects it has been associated with. Are you sure you want to delete the tag?';
      expect(browser.isElementPresent(element(by.cssContainingText('p.ng-binding', deleteMessage)))).toBeTruthy();
      planningPage.deleteConfirm_button.click();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                      STORY FEATURE EDIT/DELETE/ADD CHECKS                        *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 2072: Delete, edit, or add features on stories: ', function() {
    beforeEach(function() {
      planningModal.feature.click();
      browser.actions().sendKeys(featureName, protractor.Key.ENTER).perform();
      planningPage.save_button.click();
      browser.sleep(1000);//wait for story to save
      helper.getUrl(org_url + workspace + 'admin/configuration/general/');
      configurationsPage.configurationPlanning.waitReady('withRefresh');
      configurationsPage.configurationPlanning.click();
    });

    it('Should be able to edit a feature .', function() {
      configurationsPage.editFeatureName(featureName + '_updated');
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.clickStoryCard(0);
      expect(browser.isElementPresent(element(by.
        cssContainingText('.ng-binding', featureName + '_updated')))).toBeTruthy();
      helper.getUrl(org_url + workspace + 'admin/configuration/general/');
      configurationsPage.configurationPlanning.waitReady('withRefresh');
      configurationsPage.configurationPlanning.click();
      configurationsPage.deleteFeature();
    });

    it('Should be able to delete a feature.', function() {
      configurationsPage.deleteFeature();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(browser.isElementPresent(element(by.cssContainingText('.ng-binding', featureName)))).toBeFalsy();
    });

    it('Should be able to receive delete message while deleting a feature .', function() {
      var feature = element.all(by.repeater('feature in planning.features')).get(0);
      browser.actions().mouseMove(feature.element(by.model('feature.title'))).perform();
      feature.element(by.css('[uib-tooltip="Delete"]')).click();
      var deleteMessage = 'Deleting this feature will remove it from all objects it has been associated with.' +
        '  Are you sure you want to delete the feature?';
      expect(browser.isElementPresent(element(by.cssContainingText('p.ng-binding', deleteMessage)))).toBeTruthy();
      planningPage.deleteConfirm_button.click();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                       STORY RELEASES EDIT/DELETE/ADD CHECKS                      *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 2073: Delete, edit, or add releases on stories: ', function() {

    beforeEach(function() {
      planningModal.save_button.click();
      menuPage.hoverAndClickOnReleases();
      releasePage.addRelease(releaseName);
    });

    it('Should be able to edit a release title.', function() {
      releasePage.editReleaseTitle(releaseName, '_updated');
      expect(releasePage.releaseTitle.get(0).getText()).toBe(releaseName + '_updated');
      releasePage.deleteFirstRelease();
    });

    it('Should be able to delete all releases.', function() {
      releasePage.deleteAllReleases();
      expect(browser.isElementPresent(releasePage.noReleaseMessage)).toBeTruthy();
      releasePage.addRelease('Release1');
    });

    it('Should be able to delete all associations of the release.', function() {
      releasePage.deleteFirstRelease();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.clickStoryCard(0);
      expect(browser.isElementPresent(element(by.cssContainingText('.ng-binding', releaseName)))).toBeFalsy();
    });

    it('REQ 2809: Should not be able to add an already existing release', function() {
      browser.sleep(1000);
      releasePage.addRelease(releaseName);
      expect(releasePage.alreadyExistsMessage.getText()).toBe('A release with this value already exists');
      releasePage.cancelButton.click();
      releasePage.addReleaseButton.waitReady();
      expect(releasePage.releaseTitle.count()).toBe(2);
      releasePage.deleteFirstRelease();
    });
  });
});
