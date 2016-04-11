
var orgAdmin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var MenuPage = require('./../../pages/menuItem_page.js');
var CommonPage = require('./../../pages/common_item_page.js');
var LibraryPage = require('./../../pages/library_page.js');
var helper = require('../../helpers/helper.js');
require('../../helpers/waitReady.js');

describe('Library Resources:', function() {
  var loginPage;
  var libraryPage;
  var commonPage;
  var menuPage;
  var resourceName;

  beforeEach(function() {
    libraryPage = new LibraryPage();
    loginPage = new LoginPage();
    commonPage = new CommonPage();
    menuPage = new MenuPage();
    resourceName = 'Resource_' + Date.now();
  });

  describe('Admin Should be able to: ', function() {

    beforeEach(function() {
      helper.login(orgAdmin.username, orgAdmin.password);
      helper.getUrl(org_url + workspace);
      menuPage.menuBar.waitReady();
      menuPage.library_menuItem.click();
    });

    afterEach(function() {
      menuPage.library_menuItem.click();
      libraryPage.deleteAllResources();
      helper.logout();
    });

    //browser.mousemove doesn't work anymore, need to fix.
    xit('Add a resource through the sidebar', function() {
      browser.actions().mouseMove(menuPage.library_menuItem).perform();
      libraryPage.enterNewResourcesName_OnSubMenu(resourceName);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      var newResourceTitle = libraryPage.first_resourceTitle_onSubMenu.getText();
      expect(newResourceTitle).toBe(resourceName);
    });

    xit('Edit a resource', function() {
      browser.actions().mouseMove(menuPage.library_menuItem).perform();
      libraryPage.enterNewResourcesName_OnSubMenu(resourceName);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      libraryPage.first_resourceTitle_onSubMenu.click();
      libraryPage.clickOnResourceTitle_ResourcePage();
      libraryPage.cabinetTitle_editBox.clear();
      var newTitle = resourceName + '_updated';
      libraryPage.cabinetTitle_editBox.sendKeys(newTitle);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
      browser.actions().mouseMove(menuPage.library_menuItem).perform();
      var newResourceTitle = libraryPage.first_resourceTitle_onSubMenu.getText();
      expect(newResourceTitle).toBe(newTitle);
    });
  });
});
