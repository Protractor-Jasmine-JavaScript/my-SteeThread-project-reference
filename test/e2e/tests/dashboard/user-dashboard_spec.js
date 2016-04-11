'use strict';
/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var org_user = browser.params.users.orgUser;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');
var DashBoard = require('./../../pages/dashboard_page');

describe('User Dashboard', function() {
  var menuPage;
  var dashboard_page;

  beforeEach(function() {
    menuPage = new MenuPage();
    dashboard_page = new DashBoard();
  });

  describe('REQ 1944: Non-admin receives 403 error when navigating to User Dashboard', function() {

    beforeEach(function() {
      helper.login(org_user.username, org_user.password);
      helper.waitUntilPresent(menuPage.dashboard_link);
      menuPage.dashboard_link.click();
    });

    afterEach(function() {
      helper.logout();
    });

    describe('Non-Org Admin', function() {
      it('Should be able to see Dashboard', function() {
        expect(element(by.css('.page-breadcrumb')).getText()).toContain('User Dashboard');
      });
    });

  });
});
