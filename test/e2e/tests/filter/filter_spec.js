'use strict';
/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var orgUser = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var orgUserObserver = browser.params.users.orgUserObserver;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;
var LoginPage = require('./../../pages/login_page.js');
var PlanningPage = require('./../../pages/planning_page');
var PlanningModalPage = require('./../../pages/planning_modal_page');
var FilterPage = require('./../../pages/filter_page.js');
var ListPage = require('./../../pages/list_page.js');
var helper = require('../../helpers/helper.js');
require('../../helpers/waitReady.js');

/************************************************************************************
 *                                                                                  *
 *                                    FILTER                                        *
 *                                                                                  *
 ************************************************************************************/

describe('Filter: ', function() {

  var filterPage;
  var loginPage;
  var planningPage;
  var planningModal;
  var listPage;

  beforeEach(function() {
    filterPage = new FilterPage();
    loginPage = new LoginPage();
    planningPage = new PlanningPage();
    planningModal = new PlanningModalPage();
    listPage = new ListPage();

    helper.login(orgAdmin.username, orgAdmin.password);
  });

  afterEach(function() {
    helper.logout();
  });

  describe('Lists: ', function() {

    beforeEach(function() {
      helper.getUrl(org_url + workspace + 'lists/');
    });

    it('REQ 2993: Should be able to filter on completed Tasks', function() {
      listPage.addNewListBox.waitReady();
      listPage.addNewListBox.sendKeys('newList');
      listPage.addListButton.click();
      listPage.clickOnNewList();
      listPage.add_button.waitReady();
      listPage.add_button.click();
      listPage.taskModalTitle.waitReady();
      listPage.enterItemTitle('newTask');
      listPage.saveModalButton.click();
      listPage.completeTask.waitReady();
      listPage.completeTask.click();
      filterPage.openFilterButton.click();
      filterPage.isCompletedFilterOptions.waitReady();
      filterPage.isCompletedFilterOptions.click();
      filterPage.completedOption.waitReady();
      filterPage.completedOption.click();
      expect(browser.isElementPresent(listPage.taskTitle)).toBeTruthy();
      filterPage.completedOption.click();
      filterPage.inProgressOption.click();
      browser.sleep(1000);//wait for filter to save/apply
      expect(browser.isElementPresent(listPage.taskTitle)).toBeFalsy();
      listPage.deleteAllLists();
    });

  });

  xdescribe('Planning Wall: ', function() {

    beforeEach(function() {
      helper.getUrl(org_url + workspace + 'planning/');
    });

    it('REQ 2859: Should display the number of filters applied to a page next to the filter button', function() {
      filterPage.openFilterButton.click();
      filterPage.keywordFilter.waitReady();
      filterPage.keywordFilter.sendKeys('newFilter');
      browser.sleep(2000);//wait for filter to save
      filterPage.closeFilter.click();
      filterPage.openFilterButton.waitReady();
      expect(browser.isElementPresent(filterPage.filterCountBadge)).toBeTruthy();
      expect(filterPage.filterCountBadge.getText()).toBe('1');
    });

    it('REQ 1929: Should use the keyword filter to filter stories on the wall', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('one');
      planningModal.save_button.click();
      planningPage.addStoryButton.waitReady();
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('two');
      planningModal.save_button.click();
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.keywordFilter.waitReady();
      filterPage.keywordFilter.sendKeys('one');
      browser.sleep(2000);//wait for filter to save
      filterPage.closeFilter.click();
      expect(planningPage.storyCardTitle.get(0).getText()).toBe('one');
      expect(planningPage.storyCardTitle.count()).toBe(1);
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.clearFilter.waitReady();
      filterPage.clearFilter.click();
      browser.sleep(2000);//wait for filter to save
      filterPage.closeFilter.click();
      helper.getUrl(org_url + workspace + 'planning/');
      planningPage.clearBacklog();
    });

    it('REQ 2017: Should be able to filter stages with the "No Stage" option', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('one');
      planningModal.save_button.click();
      planningPage.addStoryButton.waitReady();
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('two');
      planningModal.selectStage('-----');
      planningModal.save_button.click();
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.filterStageOption.waitReady();
      filterPage.filterStageOption.click();
      filterPage.noStageFilter.click();
      browser.sleep(1000);//wait for filter to save
      filterPage.closeFilter.click();
      expect(planningPage.storyCardTitle.count()).toBe(0);
      helper.getUrl(org_url + workspace + 'planning/');
      expect(element(by.binding('::story.title')).getText()).toBe('two');
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.clearFilter.waitReady();
      filterPage.clearFilter.click();
      browser.sleep(2000);//wait for filter to save
      filterPage.closeFilter.click();
      planningPage.clearBacklog();
    });

    it('REQ 2177: Should be able to save and delete a filter', function() {
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.keywordFilter.waitReady();
      filterPage.keywordFilter.sendKeys('newSavedFilter');
      browser.sleep(2000);
      helper.scrollToElement(filterPage.saveFilterButton);
      filterPage.saveFilterButton.click();
      filterPage.saveFilterTitleBox.waitReady();
      filterPage.saveFilterTitleBox.sendKeys('savedFilter');
      filterPage.saveConfirmButton.click();
      filterPage.filterStageOption.waitReady();
      helper.scrollToElement(filterPage.savedFilterOption);
      filterPage.savedFilterOption.click();
      filterPage.savedFilterName.waitReady();
      expect(filterPage.savedFilterName.getText()).toBe('savedFilter');
      filterPage.deleteFilterButton.click();
      filterPage.deleteConfirmButton.waitReady();
      filterPage.deleteConfirmButton.click();
    });

    it('REQ 2895: Should be able to filter on expedited', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('Expedited');
      planningModal.expedited.click();
      planningModal.save_button.click();
      planningPage.addStoryButton.waitReady();
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('Not Expedited');
      planningModal.save_button.click();
      browser.sleep(3000);//Wait for the toaster to disappear as it is blocking a click action
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.filterOtherOption.waitReady();
      helper.scrollToElement(filterPage.filterOtherOption);
      filterPage.filterOtherOption.click();
      helper.scrollToElement(filterPage.expeditedFilterOption);
      filterPage.expeditedFilterOption.waitReady();
      filterPage.expeditedFilterOption.click();
      browser.sleep(1000);
      expect(planningPage.storyCardTitle.get(0).getText()).toBe('Expedited');
      expect(planningPage.storyCardTitle.count()).toBe(1);
      filterPage.clearFilter.waitReady();
      filterPage.clearFilter.click();
      filterPage.closeFilter.click();
      helper.getUrl(org_url + workspace + 'planning/');
      planningPage.clearBacklog();
    });

    it('REQ 2895: Should be able to filter on blocked', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('Blocked');
      planningModal.blocked.click();
      planningModal.blockedComment.clear();
      planningModal.blockedComment.sendKeys('Comment');
      planningModal.save_button.click();
      planningPage.addStoryButton.waitReady();
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys('Not Blocked');
      planningModal.save_button.click();
      browser.sleep(3000);//Wait for the toaster to disappear as it is blocking a click action
      filterPage.openFilterButton.waitReady();
      filterPage.openFilterButton.click();
      filterPage.filterOtherOption.waitReady();
      helper.scrollToElement(filterPage.filterOtherOption);
      filterPage.filterOtherOption.click();
      helper.scrollToElement(filterPage.blockedFilterOption);
      filterPage.blockedFilterOption.waitReady();
      filterPage.blockedFilterOption.click();
      browser.sleep(1000);
      expect(planningPage.storyCardTitle.get(0).getText()).toBe('Blocked');
      expect(planningPage.storyCardTitle.count()).toBe(1);
      filterPage.clearFilter.waitReady();
      filterPage.clearFilter.click();
      filterPage.closeFilter.click();
      helper.getUrl(org_url + workspace + 'planning/');
      planningPage.clearBacklog();
    });

  });

});
