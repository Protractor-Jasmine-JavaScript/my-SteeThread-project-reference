'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */
require('./waitReady.js');
var LoginPage = require('../pages/login_page.js');
var CommonPage = require('../pages/common_item_page.js');
var userMenu = element(by.css('.top-menu')).element(by.binding('user.username'));
var logOutLink = element(by.partialLinkText('Log Out'));

module.exports = {

  /*Usage: Logs user in.*/
  login: function(username, password) {
    var loginPage = new LoginPage();
    this.getUrl(browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name + 'login/');
    loginPage.login(username, password);
    this.waitUntilPresent(element(by.binding('user.username')));
  },

  /*Usage: Logs user out.*/
  logout: function() {
    userMenu.waitReady('withRefresh');
    userMenu.click();
    logOutLink.waitReady();
    logOutLink.click();
  },

  /**
   * Usage: Generate random string.
   * characterLength :  Length of string.
   * Returns : Random string.
   */
  getRandomString: function(characterLength) {
    var randomText = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < characterLength; i++) {
      randomText += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomText;
  },

  /**
   * Usage: Generate random number.
   * characterLength :  Length of number.
   * Returns : Random number.
   */
  getRandomNumber: function(numberLength) {
    var randomNumber = '';
    var possible = '0123456789';
    for (var i = 0; i < numberLength; i++) {
      randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomNumber;
  },

  /*Delete items*/
  delete: function() {
    var commonPage = new CommonPage();
    commonPage.delete_selectedItem();
  },

  /*Delete all items  */
  deleteAll: function() {
    element(by.model('checkboxes.checked')).click();
    var commonPage = new CommonPage();
    commonPage.delete_selectedItem();
  },

  getUrl: function(url) {
    browser.driver.get(url);
  },

  waitUntilPresent: function(elm, timeout) {
    timeout = timeout || 60000;

    return browser.driver.wait(function() {
      return elm.isPresent().then(function(isPresent) {
        return isPresent;
      });
    }, timeout, 'Error Waiting for element to be present');
  },

  scrollToElement: function(element) {
    browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
  },

  hasClass: function(element, cls) {
    return element.getAttribute('class').then(function(classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  }
};
