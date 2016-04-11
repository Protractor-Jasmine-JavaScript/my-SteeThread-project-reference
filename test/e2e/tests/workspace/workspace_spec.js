'use strict';

var org_user = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');
var CommonPage = require('./../../pages/common_item_page');
var WorkspacePage = require('./../../pages/workspace_page.js');
require('../../helpers/waitReady.js');

describe('Workspaces: ', function() {
  var loginPage;
  var menuPage;
  var commonPage;
  var workspacePage;
  var newTitle;
  var newString;

  beforeEach(function() {
    loginPage = new LoginPage();
    menuPage = new MenuPage();
    commonPage = new CommonPage();
    workspacePage = new WorkspacePage();
    newTitle = 'newTitle-' + Date.now();
    newString = 'newString-' + Date.now();
    helper.login(orgAdmin.username, orgAdmin.password);
  });
  
  afterEach(function() {
    helper.logout();
  });

  /**
   *
   */
  describe('Workspace Tile: ', function() {

    it('Should add a new workspace', function() {

    });

  });
});
