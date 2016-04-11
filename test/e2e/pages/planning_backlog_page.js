'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

require('../helpers/waitReady.js');

var PlanningBacklogPage = function() {
  this.backlogGreenTitle = element(by.cssContainingText('.canary-green-300.page-title', 'BACKLOG'));
  this.addStoryButton = element(by.buttonText('Add Story'));
  this.selectAllCheckBox = element(by.css('md-icon[ng-click="backlog.toggleAllSelected()"]'));
  this.selectDropdown = element.all(by.css('md-icon[md-svg-icon="menu-down"]')).get(0);
  this.deleteButtonDropdown = element(by.buttonText('Delete'));
  this.deleteButtonConfirm = element.all(by.buttonText('Delete')).get(1);
  this.backlogStories = element.all(by.repeater('story in backlog.displayedBacklog'));
  this.userStoryColumn = element(by.id('slugId'));
  this.titleColumn = element(by.id('title'));
  this.scoreColumn = element(by.id('score'));
  this.typeColumn = element(by.id('type'));
  this.priorityColumn = element(by.id('priority'));
  this.statusColumn = element(by.id('status'));
  this.pointsColumn = element(by.id('effort'));
  this.firstStoryInformation = element.all(by.repeater('story in backlog.displayedBacklog').row(0)).get(0);

  this.clearBacklog = function() {
    this.selectAllCheckBox.waitReady();
    this.selectAllCheckBox.click();
    this.selectDropdown.click();
    this.deleteButtonDropdown.waitReady();//in the dropdown
    this.deleteButtonDropdown.click();
    this.deleteButtonConfirm.waitReady();//in delete confirmation modal
    this.deleteButtonConfirm.click();
  };

  this.storyIsCreatedAndPresentBacklog = function(title) {
    element(by.cssContainingText('a[ng-if="::column.isLink"]', title)).waitReady('withRefresh');
    return browser.isElementPresent(element(by.cssContainingText('a[ng-if="::column.isLink"]', title)));
  };

};

module.exports = PlanningBacklogPage;
