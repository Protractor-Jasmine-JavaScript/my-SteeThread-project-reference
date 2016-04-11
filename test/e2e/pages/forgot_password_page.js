/**
 *
 * A page object that contains elements for use by the forgot_password tests.
 */
'use strict';

var ForgotPasswordPage = function() {
    this.backButton = element(by.id('back-btn'));
    this.emailField = element(by.model('data.email'));
    this.submitButton = element(by.id('submit-btn'));
    this.emailMessage = element(by.xpath('//p[contains(text(),"e-mail address")]'));
    this.error_msg = element(by.css('span.ng-binding.ng-scope'));
    this.success_msg = element(by.xpath('//p[contains(text(),"Request Submitted")]'));

    this.getUrl = function() {
      browser.get('org/' + browser.params.organization.organization_name + '/forgot');
    };

    this.enterEmail = function(email) {
        this.emailField.sendKeys(email);
    };

    this.clickSubmit = function() {
      this.submitButton.click();
        browser.driver.sleep(500);
        browser.waitForAngular();
    };

    this.clickBack = function() {
      this.backButton.click();
        browser.driver.sleep(500);
        browser.waitForAngular();
    };

    this.userNotFoundErr = function() {
        return this.error_msg;
    };

    this.requestSubmitted = function() {
        return this.success_msg;
    };
};

module.exports = ForgotPasswordPage;