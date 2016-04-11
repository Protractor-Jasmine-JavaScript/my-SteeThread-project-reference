/**
 * Created by faizul on 3/16/15.
 */
'use strict';

var UserManagementPage = function() {
    this.settings_icon = element(by.css('.icon-settings'));

    this.addUser_button = element(by.css('.btn.btn-sm.btn-success'));

    this.firstNameInput = element(by.model('user.firstname'));
    this.lastNameInput = element(by.model('user.lastname'));
    this.emailInput = element(by.model('user.email'));

    this.usernameInput = element(by.model('user.username'));
    this.passwordInput = element(by.model('user.password'));
    this.confirmPasswordInput = element(by.model('user.confirmPassword'));

    this.org_save_button = element(by.css('btn.btn-success.save'));

    this.addUser = function(fName, lName, email, username, password) {
        this.addUser_button.click();
        browser.sleep(500);
        this.firstNameInput.sendKeys(fName);
        this.lastNameInput.sendKeys(lName);
        this.emailInput.sendKeys(email);
        this.usernameInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
        this.confirmPasswordInput.sendKeys(password);
        //this.org_save_button.click();
        browser.sleep(500);
    };
};

module.exports = UserManagementPage;
