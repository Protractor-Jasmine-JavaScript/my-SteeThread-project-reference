'use strict';

var LoginPage = function() {
  this.username = element(by.model('login.credentials.username'));
  this.password = element(by.model('login.credentials.password'));
  this.loginButton = element(by.buttonText('Login'));
  this.error_msg_login = element(by.binding('login.error'));
  /**
   *Forgot Password
   */
  this.forgotPasswordButton = element(by.id('forget-password'));
  this.forgotPasswordTitle = element(by.css('.login-title'));
  this.backButton = element(by.buttonText('Back'));
  this.submitButton = element(by.buttonText('Submit'));
  this.enterEmailBox = element(by.model('forgot.data.email'));
  this.error_msg = element(by.binding('forgot.alert.msg'));
  this.confirm_submit_msg = element(by.css('div[ng-if="!forgot.showForm"]'));

  this.login = function(username, password) {
    this.username.sendKeys(username);
    this.password.sendKeys(password);
    this.loginButton.click();
  };

};

module.exports = LoginPage;
