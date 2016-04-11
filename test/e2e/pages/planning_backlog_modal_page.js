'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

require('../helpers/waitReady.js');

var PlanningBacklogModalPage = function() {
  this.addStoryButton = element(by.buttonText('Add Story'));//NOT IN THE MODAL!
  this.storyTitleBox = element(by.model('storyModal.item.title'));
  this.storyTypeSelectBox = element(by.model('storyModal.item.type'));
  this.storyPointsSelectBox = element(by.model('storyModal.item.effort'));
  this.storyTabs = element.all(by.repeater('tab in $mdTabsCtrl.tabs'));
  this.descriptionTab = this.storyTabs.get(0);
  this.assignTab = this.storyTabs.get(1);
  this.tagsTab = this.storyTabs.get(2);
  this.datesTab = this.storyTabs.get(3);
  this.priorityTab = this.storyTabs.get(4);
  this.attachmentsTab = this.storyTabs.get(5);
  this.saveStoryButton = element(by.buttonText('Save'));

  this.addStoryOnlyTitle = function(title) {
    this.addStoryButton.waitReady('withRefresh');
    this.addStoryButton.click();
    this.storyTitleBox.waitReady();
    this.storyTitleBox.sendKeys(title);
    this.saveStoryButton.click();
  };

  this.addStory = function(title, type, points, priority) {
    this.addStoryButton.waitReady('withRefresh');
    this.addStoryButton.click();
    this.storyTitleBox.waitReady();
    this.storyTitleBox.sendKeys(title);
    this.storyTypeSelectBox.click();
    element(by.cssContainingText('md-option[role="option"]', type)).waitReady();
    element(by.cssContainingText('md-option[role="option"]', type)).click();
    this.storyPointsSelectBox.click();
    element(by.cssContainingText('md-option[role="option"]', points)).waitReady();
    element(by.cssContainingText('md-option[role="option"]', points)).click();
    this.priorityTab.click();
    element(by.css('md-radio-button[aria-label="' + priority + '"]')).waitReady();
    element(by.css('md-radio-button[aria-label="' + priority + '"]')).click();
    this.saveStoryButton.click();
  };
};

module.exports = PlanningBacklogModalPage;
