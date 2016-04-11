/**
 */

var admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var MenuPage = require('./../../pages/menuItem_page.js');
var helper = require('../../helpers/helper.js');

describe('REQ 0000: User as "Admin" permissions validation ', function() {
  var loginPage;
  var menuPage;

  beforeAll(function() {
    loginPage = new LoginPage();
    menuPage = new MenuPage();
    helper.login(admin.username, admin.password);

    helper.getUrl(org_url + workspace);
    helper.waitUntilPresent(menuPage.menuBar);
    element(by.css('.icon-settings')).click();
    element(by.linkUiSref('org.admin.access-control.users')).click();
    element(by.linkUiSref('org.admin.access-control.roles')).click();
    element(by.cssContainingText('td', 'Admin')).allowAnimations(false);
    element(by.cssContainingText('td', 'Admin')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'Planning')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'Library')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'Lists')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'Documents')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'Delivery')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'Workspace Management')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'SCM')).click();
    element(by.cssContainingText('div.caption.ng-binding', 'CI')).click();
  });

  afterAll(function() {
    helper.logout();
  });

  describe('Admin :', function() {

    it('Should be able to see Planning "Create"', function() {
      expect(element.all(by.binding('perm.name')).get(0).getText()).toBe('Create');
    });

    it('Should be able to see Planning "Update"', function() {
      expect(element.all(by.binding('perm.name')).get(1).getText()).toBe('Update');
    });

    it('Should be able to see Planning "Delete"', function() {
      expect(element.all(by.binding('perm.name')).get(2).getText()).toBe('Delete');
    });

    it('Should be able to see Planning "Manage Planing"', function() {
      expect(element.all(by.binding('perm.name')).get(3).getText()).toBe('Manage Planning');
    });

    it('Should be able to see Planning "Add Attachments"', function() {
      expect(element.all(by.binding('perm.name')).get(4).getText()).toBe('Add Attachments');
    });

    it('Should be able to see Library "Create"', function() {
      expect(element.all(by.binding('perm.name')).get(5).getText()).toBe('Create');
    });

    it('Should be able to see Library "Update"', function() {
      expect(element.all(by.binding('perm.name')).get(6).getText()).toBe('Update');
    });

    it('Should be able to see Library "Delete"', function() {
      expect(element.all(by.binding('perm.name')).get(7).getText()).toBe('Delete');
    });

    it('Should be able to see Library "Add Attachments"', function() {
      expect(element.all(by.binding('perm.name')).get(8).getText()).toBe('Add Attachments');
    });

    it('Should be able to see List "Create"', function() {
      expect(element.all(by.binding('perm.name')).get(9).getText()).toBe('Create');
    });

    it('Should be able to see List "Update"', function() {
      expect(element.all(by.binding('perm.name')).get(10).getText()).toBe('Update');
    });

    it('Should be able to see List "Delete"', function() {
      expect(element.all(by.binding('perm.name')).get(11).getText()).toBe('Delete');
    });

    it('Should be able to see List "Add Attachments"', function() {
      expect(element.all(by.binding('perm.name')).get(12).getText()).toBe('Add Attachments');
    });

    it('Should be able to see Documents "Create"', function() {
      expect(element.all(by.binding('perm.name')).get(13).getText()).toBe('Create');
    });

    it('Should be able to see Documents "Update"', function() {
      expect(element.all(by.binding('perm.name')).get(14).getText()).toBe('Update');
    });

    it('Should be able to see Documents "Delete"', function() {
      expect(element.all(by.binding('perm.name')).get(15).getText()).toBe('Delete');
    });

    it('Should be able to see Documents "Add Attachments"', function() {
      expect(element.all(by.binding('perm.name')).get(16).getText()).toBe('Add Attachments');
    });

    it('Should be able to see Documents "Manage Documents"', function() {
      expect(element.all(by.binding('perm.name')).get(17).getText()).toBe('Manage Documents');
    });

    it('Should be able to see Delivery "Create"', function() {
      expect(element.all(by.binding('perm.name')).get(18).getText()).toBe('Create');
    });

    it('Should be able to see Delivery "Update"', function() {
      expect(element.all(by.binding('perm.name')).get(19).getText()).toBe('Update');
    });

    it('Should be able to see Delivery "Delete"', function() {
      expect(element.all(by.binding('perm.name')).get(20).getText()).toBe('Delete');
    });

    it('Should be able to see Delivery "Execute"', function() {
      expect(element.all(by.binding('perm.name')).get(21).getText()).toBe('Execute');
    });

    it('Should be able to see Delivery "Resume"', function() {
      expect(element.all(by.binding('perm.name')).get(22).getText()).toBe('Resume');
    });

    it('Should be able to see Workspace Management "Manage Roles"', function() {
      expect(element.all(by.binding('perm.name')).get(23).getText()).toBe('Manage Roles');
    });

    it('Should be able to see Workspace Management "Manage Users"', function() {
      expect(element.all(by.binding('perm.name')).get(24).getText()).toBe('Manage Users');
    });

    it('Should be able to see Workspace Management "Manage Tags"', function() {
      expect(element.all(by.binding('perm.name')).get(25).getText()).toBe('Manage Tags');
    });

    it('Should be able to see Workspace Management "Manage Customizations"', function() {
      expect(element.all(by.binding('perm.name')).get(26).getText()).toBe('Manage Customizations');
    });

    it('Should be able to see Workspace Management "Update Workspace"', function() {
      expect(element.all(by.binding('perm.name')).get(27).getText()).toBe('Update Workspace');
    });

    it('Should be able to see SCM "Create Repositories"', function() {
      expect(element.all(by.binding('perm.name')).get(28).getText()).toBe('Create Repositories');
    });

    it('Should be able to see SCM "View Repositories"', function() {
      expect(element.all(by.binding('perm.name')).get(29).getText()).toBe('View Repositories');
    });

    it('Should be able to see SCM "Update Repositories"', function() {
      expect(element.all(by.binding('perm.name')).get(30).getText()).toBe('Update Repositories');
    });

    it('Should be able to see SCM "Delete Repositories"', function() {
      expect(element.all(by.binding('perm.name')).get(31).getText()).toBe('Delete Repositories');
    });

    it('Should be able to see SCM "Manage SCM Groups"', function() {
      expect(element.all(by.binding('perm.name')).get(32).getText()).toBe('Manage SCM Groups');
    });

    it('Should be able to see SCM "Assign Permissions"', function() {
      expect(element.all(by.binding('perm.name')).get(33).getText()).toBe('Assign Permissions');
    });

    it('Should be able to see CI "Assign User Permissions"', function() {
      expect(element.all(by.binding('perm.name')).get(34).getText()).toBe('Assign User Permissions');
    });

    it('Should be able to see CI "Create Jobs"', function() {
      expect(element.all(by.binding('perm.name')).get(35).getText()).toBe('Create Jobs');
    });

    it('Should be able to see CI "View Jobs"', function() {
      expect(element.all(by.binding('perm.name')).get(36).getText()).toBe('View Jobs');
    });

    it('Should be able to see CI "Update Jobs"', function() {
      expect(element.all(by.binding('perm.name')).get(37).getText()).toBe('Update Jobs');
    });

    it('Should be able to see CI "Delete Jobs"', function() {
      expect(element.all(by.binding('perm.name')).get(38).getText()).toBe('Delete Jobs');
    });

  });
});
