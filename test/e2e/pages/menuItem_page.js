'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */
require('../helpers/waitReady.js');

var MenuPage = function() {
  this.menuBar = element(by.css('.page-sidebar'));
  this.documents_menuItem = this.menuBar.element(by.linkUiSref('org.workspace.documents'));
  this.library_menuItem = this.menuBar.element(by.linkUiSref('org.workspace.library'));
  this.workspaceAdmin_menuItem = this.menuBar.element(by.linkUiSref('org.workspace.admin'));
  this.customField_menuItem = this.menuBar.element(by.linkUiSref('org.workspace.admin.customization.customfield'));
  this.list_menuItem = this.menuBar.element(by.linkUiSref('org.workspace.lists'));
  this.delivery_menuItem = this.menuBar.element(by.linkUiSref('org.workspace.delivery'));
  this.planningMenuItem = element.all(by.id('planningMenu'));
  this.planningWallSubItem = element(by.linkUiSref('org.workspace.planning.wall'));
  this.planningReleasesSubItem = element(by.linkUiSref('org.workspace.planning.releases'));
  this.adminCog_icon = element(by.css('.icon-settings'));
  this.dashboard_link = element(by.className('page-logo')).element(by.linkUiSref('org.dashboard'));
  this.canaryLogo = element.all(by.linkUiSref('org.dashboard')).get(0);

  this.closeSidebar = function() {
    element(by.css('.st-footer')).click();
  };

  this.hoverAndClickOnCustomField = function() {
    browser.actions().mouseMove(this.workspaceAdmin_menuItem).perform();
    this.customField_menuItem.click();
  };

  this.hoverAndClickOnAccessControlField = function() {
    browser.actions().mouseMove(this.workspaceAdmin_menuItem).perform();
    browser.actions().mouseMove(this.customField_menuItem).perform();
    element.all(by.linkUiSref('org.workspace.admin.main.users')).then(function(elm) {
      elm[0].click();
    });
  };

  this.hoverAndClickOnConfigurations = function() {
    browser.actions().mouseMove(element(by.css('li[ng-if="workspace.userIsAdmin"]'))).perform();
    element(by.linkText('Configurations')).waitReady();
    element(by.linkText('Configurations')).click();
  };

  this.hoverAndClickOnReleases = function() {
    this.planningMenuItem.then(function() {
      browser.actions().mouseMove(element(by.id('planningMenu'))).perform();
      element(by.id('planningMenu')).element(by.linkUiSref('org.workspace.planning.releases')).click();
      element.all(by.linkUiSref('org.dashboard')).get(0).waitReady();
      browser.actions().mouseMove(element.all(by.linkUiSref('org.dashboard')).get(0)).perform();
    });
  };

  this.hoverAndClickOnPlanningWall = function() {
    this.planningMenuItem.then(function() {
      browser.actions().mouseMove(element(by.id('planningMenu'))).perform();
      element(by.id('planningMenu')).element(by.linkUiSref('org.workspace.planning.wall')).click();
      element.all(by.linkUiSref('org.dashboard')).get(0).waitReady();
      browser.actions().mouseMove(element.all(by.linkUiSref('org.dashboard')).get(0)).perform();
    });
  };
};

module.exports = MenuPage;
