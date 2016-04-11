'use strict';
/*global describe, beforeEach, it, inject, expect, spyOn, testMocks, browser, element, by, protractor */

var username_bad = 'BADUSERNAME';
var password_bad = 'BADPASSWORD';
var username_good = browser.params.users.orgAdmin.username;
var password_good = browser.params.users.orgAdmin.password;
var login_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name + 'login/';
var success_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var forgotUrl = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name + 'forgot/';

var helper = require('../../helpers/helper.js');
var LoginPage = require('../../pages/login_page.js');
require('../../helpers/waitReady.js');

describe('Organization Login Page', function() {
  var loginPage;

  beforeEach(function() {
    loginPage = new LoginPage();
    helper.getUrl(login_url);
  });

  describe('Login Page:', function() {

    it('Should be able to login with the valid username and password', function() {
      helper.login(username_good, password_good);
      expect(browser.getCurrentUrl()).toEqual(success_url);
      helper.logout();
    });

    it('Should present an error when no credentials are entered', function() {
      loginPage.login('', '');
      loginPage.error_msg_login.waitReady();
      expect(loginPage.error_msg_login.getText()).toEqual('Unable to Login, Please Try Again');
    });

    it('Should return an error message when trying to login with a bad username/password', function() {
      loginPage.login(username_bad, password_bad);
      loginPage.error_msg_login.waitReady();
      expect(loginPage.error_msg_login.getText()).toEqual('Unable to Login, Please Try Again');
    });

    it('REQ 2942: Should clear the password field when a wrong password is entered', function() {
      loginPage.login(username_good, password_bad);
      browser.sleep(500);//wait for password field to clear
      expect(loginPage.password.getAttribute('value')).toBe('');
    });
  });
});
