'use strict';
/*global describe, beforeEach, it, inject, expect, spyOn, testMocks, browser, element, by, protractor */

var login_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name + 'login/';
var email_good = browser.params.email.valid_email;
var email_bad = browser.params.email.invalid_email;
var email_incomplete = browser.params.email.incomplete_email;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
require('../../helpers/waitReady.js');

describe('Organization Login Page', function() {

  var loginPage;

  beforeEach(function() {
    loginPage = new LoginPage();
    helper.getUrl(login_url);
    loginPage.forgotPasswordButton.click();
  });

  describe('Reset Password', function() {

    it('Should nav to the forgot password page', function() {
      loginPage.forgotPasswordTitle.waitReady();
      expect(loginPage.forgotPasswordTitle.getText()).toEqual('Forgot your password?');
    });

    it('Should direct the user to the reset password page then back to the login page', function() {
      loginPage.backButton.waitReady();
      loginPage.backButton.click();
      expect(browser.getCurrentUrl()).toEqual(login_url);
    });

    it('Should not be able to click the submit button if there is no info in the email field', function() {
      loginPage.submitButton.waitReady();
      expect(loginPage.submitButton.isEnabled()).toBe(false);
    });

    it('Submit button should not be clickable with an incomplete email', function() {
      loginPage.enterEmailBox.waitReady();
      loginPage.enterEmailBox.sendKeys(email_incomplete);
      expect(loginPage.submitButton.isEnabled()).toBe(false);
    });

    it('Clicking the submit button with an invalid email should return a User not found error', function() {
      loginPage.enterEmailBox.waitReady();
      loginPage.enterEmailBox.sendKeys(email_bad);
      loginPage.submitButton.click();
      loginPage.error_msg.waitReady();
      expect(loginPage.error_msg.getText()).toEqual('User not found');
    });

    //IS NOT CONSISTENT, WILL FAIL TO FIND THE CONFIRM MESSAGE SOMETIMES, VERY ANNOYING :/
    xit('Clicking the submit button with a valid email should display a confirmation message.', function() {
      loginPage.enterEmailBox.waitReady();
      loginPage.enterEmailBox.sendKeys(email_good);
      loginPage.submitButton.click();
      loginPage.confirm_submit_msg.waitReady();
      expect(browser.isElementPresent(loginPage.confirm_submit_msg)).toBeTruthy();
    });
  });
});
