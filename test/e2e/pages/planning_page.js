'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

require('../helpers/waitReady.js');

var PlanningPage = function() {
  this.deleteConfirm_button = element(by.buttonText('Delete'));
  this.save_button = element(by.buttonText('Save'));
  this.cancelButton = element(by.buttonText('Cancel'));
  this.wall_grid = element(by.linkUiSref('org.workspace.planning.wall'));
  this.addStoryButton = element.all(by.buttonText('Add Item')).get(0);
  this.addStoryToNewStage = element.all(by.buttonText('Add Item')).get(4);
  this.addStoryBacklog = element(by.buttonText('Add Story'));
  this.expandModal_button = element(by.css('.modal-more-toggle.ng-scope'));
  this.filter_button = element(by.id('open-filter'));
  this.stageFilter = element(by.cssContainingText('.caption.st-filter-caption', 'Stage'));
  this.lastFilterElement = element.all(by.css('.caption.st-filter-caption')).last();
  this.releaseTab = element(by.linkText('Releases'));
  this.storyCards = element.all(by.repeater('story in step.stories'));
  this.storyCardTitle = element.all(by.binding('story.title'));
  this.stages = element.all(by.repeater('stage in planningWall.stages'));
  this.addStageButton = element(by.buttonText('Add'));
  this.addNewStageTitleBox = element(by.model('planningStageModal.item.title'));
  this.stageColorPicker = element.all(by.model('planningStageModal.item.color'));
  this.editStageOption = element(by.linkText('Edit'));
  this.deleteStageOption = element(by.linkText('Delete'));
  this.toDoStage = element(by.cssContainingText('.stage-title', 'To Do'));
  this.doingStage = element(by.cssContainingText('.stage-title', 'Doing'));
  this.testingStage = element(by.cssContainingText('.stage-title', 'Testing'));
  /*********** GRID ***********/
  this.backlogTab = element(by.linkUiSref('org.workspace.planning.grid'));
  this.storyRowsBacklog = element.all(by.repeater('story in planningGrid.displayedBacklog'));
  this.addStoryBacklog = element(by.buttonText('Add'));
  this.selectAllStories = element(by.model('planningGrid.checkboxes.checked'));
  this.bulkUpdateTag = element(by.css('span[uib-tooltip="Tags"]'));
  this.bulkUpdateTagBox = element(by.model('newTag.text'));
  this.splitViewTitle = element(by.binding('splitView.item.title'));
  this.splitViewTag = element(by.binding('$getDisplayText()'));
  this.idColumn = element(by.id('id'));
  this.typeColumn = element(by.id('type'));
  this.titleColumn = element(by.id('title'));
  this.loeColumn = element(by.id('loe'));
  this.priorityColumn = element(by.id('priority'));
  this.statusColumn = element(by.id('status'));
  this.stageColumn = element(by.id('stage'));
  /******** STORY CARDS ********/
  this.storyDescription = element(by.binding('story.description'));
  this.deleteStoryButton = element(by.css('button[uib-tooltip="Delete"]'));
  this.storyCardUserIcon = element(by.css('.planning-story-card-assigned-badge'));
  this.noMsgEntered = element(by.css('div[ng-if="story.blocked && !story.blockedComment"]'));
  /******** SPLIT VIEW  ********/
  this.blockedComment = element(by.model('storyDetail.item.blockedComment'));

  this.customFieldExistsFilter = function(customFieldLabel) {
    return browser.isElementPresent(element(by.
    cssContainingText('.caption.st-filter-caption.ng-binding', customFieldLabel)));
  };

  this.clickOnStory = function(newStoryName) {
    element(by.cssContainingText('td.ng-binding', newStoryName)).click();
  };

  this.clickStoryCard = function(num) {
    this.storyCards.get(num).element(by.binding('story.title')).click();
    browser.sleep(1000);//wait for modal animation to finish
  };

  this.storyIsCreatedAndPresent = function() {
    this.storyCards.get(0).waitReady('withRefresh');
    return browser.isElementPresent(this.storyCards.get(0));
  };

  this.addStage = function(stageName) {
    this.addStageButton.click();
    this.addNewStageTitleBox.waitReady();
    this.addNewStageTitleBox.sendKeys(stageName);
    this.save_button.click();
    element(by.cssContainingText('.stage-title', stageName)).waitReady();
  };

  this.editStageName = function(currentStageName, newStageName) {
    element(by.cssContainingText('.stage-title', currentStageName))
      .element(by.css('strong[uib-tooltip="Edit Stage"]')).click();
    this.addNewStageTitleBox.waitReady();
    this.addNewStageTitleBox.clear();
    this.addNewStageTitleBox.sendKeys(newStageName);
    this.save_button.click();
    element(by.cssContainingText('.stage-title', newStageName)).waitReady();
  };

  this.deleteStage = function(stageName) {
    browser.actions().mouseMove(element(by.cssContainingText('.stage-title', stageName))).perform();
    element(by.cssContainingText('.stage-title', stageName)).element(by.css('button[uib-tooltip="Delete"]')).click();
    this.deleteConfirm_button.waitReady();
    this.deleteConfirm_button.click();
  };

  this.deleteStory = function() {
    browser.actions().mouseMove(this.storyCards.get(0)).perform();
    this.storyCards.get(0).element(by.css('button[uib-tooltip="Delete"]')).click();
    this.deleteConfirm_button.waitReady();
    this.deleteConfirm_button.click();
    browser.sleep(1000);
  };

  this.stageExists = function(stageName) {
    return browser.isElementPresent(element(by.cssContainingText('.stage-title', stageName)));
  };

};

module.exports = PlanningPage;
