/**
 *
 * contains elements and functions for use by the organization_admin test page.
 */
'use strict';

var OrganizationPage = function() {

    this.username = element(by.model('credentials.username'));
    this.password = element(by.model('credentials.password'));
    this.login_button = element(by.buttonText('Login'));
    this.forgot_password_button = element(by.id('forget-password'));
    this.error_string = element(by.css('span.text-danger.ng-binding'));
    this.org_admin_button = element(by.linkText('Organizations Admin'));
    this.site_user_management_button = element(by.linkText('Site User Management'));
    //this.add_organization_button = element(by.css('button.btn.btn-sm.btn-success'));
    this.add_organization_button = element(by.id('add-org'));
    this.organizationInput = element(by.model('organization.title'));
    this.pathInput = element(by.model('organization.path'));
    this.firstNameInput = element(by.model('admin.firstname'));
    this.lastNameInput = element(by.model('admin.lastname'));
    this.emailInput = element(by.model('admin.email'));
    this.usernameInput = element(by.model('admin.username'));
    this.passwordInput = element(by.model('admin.password'));
    this.confirmPasswordInput = element(by.model('admin.confirmPassword'));
    this.LDAPInput = element.all(by.model('organization.hasLdap'));
    this.org_save_button = element(by.css('button.btn.btn-success.save'));
    this.selected_options_button = element(by.css('button.btn.btn-sm.btn-default.dropdown-toggle.tooltips.ng-scope'));

    this.getUrl = function() {
        browser.get('login');
        browser.sleep(500);
    };

    this.login = function(username, password) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.login_button.click();
        browser.sleep(500);
    };

    this.badlogin = function() {
        return this.error_string;
    };

    this.forgotPasswordClick = function() {
        this.forgot_password_button.click();
        browser.sleep(500);
    };

    this.addOrganization = function(organization, path, fName, lName, email, username, password) {
        userManagement_page.addUser_button.click();
        browser.sleep(500);
        this.organizationInput.sendKeys(organization);
        this.pathInput.sendKeys(path);
        this.firstNameInput.sendKeys(fName);
        this.lastNameInput.sendKeys(lName);
        this.emailInput.sendKeys(email);
        this.usernameInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
        this.confirmPasswordInput.sendKeys(password);
       // this.org_save_button.click();
        browser.sleep(5000);
    };

    /**
     * Usage: Generate random string.
     * characterLength :  Length of string.
     * Returns : Random string.
     */
    this.getRandomString = function(characterLength) {
        var randomText = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < characterLength; i++) {
          randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomText;
    };

    /**
     * Usage: Generate random number.
     * characterLength :  Length of number.
     * Returns : Random number.
     */
    this.getRandomNumber = function(numberLength) {
        var randomNumber = '';
        var possible = '0123456789';
        for (var i = 0; i < numberLength; i++) {
          randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomNumber;
    };
};

module.exports = OrganizationPage;