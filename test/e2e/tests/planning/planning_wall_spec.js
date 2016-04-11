/**
 **/
/* global describe, beforeEach, afterEach, it, browser, expect, element, by */
'use strict';

var org_user = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');
var CommonPage = require('./../../pages/common_item_page');
var PlanningPage = require('./../../pages/planning_page');
var PlanningModalPage = require('./../../pages/planning_modal_page');
var PlanningBacklogPage = require('./../../pages/planning_backlog_page.js');
var ReleasePage = require('./../../pages/release_page');
var ConfigurationPage = require('./../../pages/configurations_page.js');
require('../../helpers/waitReady.js');

describe('Planning Wall: ', function() {
  var loginPage;
  var menuPage;
  var commonPage;
  var planningPage;
  var planningModal;
  var planningBacklog;
  var releasePage;
  var configurationPage;
  var newTitle;
  var newTitle2;
  var newStage;
  var newString;

  beforeEach(function() {
    loginPage = new LoginPage();
    menuPage = new MenuPage();
    commonPage = new CommonPage();
    planningPage = new PlanningPage();
    planningModal = new PlanningModalPage();
    planningBacklog = new PlanningBacklogPage();
    releasePage = new ReleasePage();
    configurationPage = new ConfigurationPage();
    newTitle = 'newTitle-' + Date.now();
    newTitle2 = 'newTitle2-' + Date.now();
    newStage = 'newStage' + Date.now();
    newString = 'newString-' + Date.now();
    helper.login(orgAdmin.username, orgAdmin.password);
    helper.getUrl(org_url + workspace + 'planning/wall/');
  });

  afterEach(function() {
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                               PLANNING MODAL                                     *
   *                                                                                  *
   ************************************************************************************/

  describe('Planning Modal: ', function() {

    beforeEach(function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
    });

    afterEach(function() {
      browser.sleep(1000);
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    /**
     * Tags, Features, and Releases tested in the org_admin_spec.
     * Haven't figured out how to test schedule yet.
     */

    it('Should not be able to add an item without a "Title"', function() {
      expect(planningModal.save_button.isEnabled()).toBeFalsy();
      planningModal.title.sendKeys(newTitle);
      expect(planningModal.save_button.isEnabled()).toBeTruthy();
      planningModal.save_button.click();
    });

    it('Should be able to add an item with just a "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Description" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.description.sendKeys(newString);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.description.getAttribute('value')).toBe(newString);
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Type" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.selectType('Story');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedType.getText()).toBe('Story');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Stage" and "Title"' +
      'REQ 1928: default Stage is leftmost column ', function() {
      planningModal.title.sendKeys(newTitle);
      expect(planningModal.selectedStage.getText()).toBe('To Do');
      planningModal.selectStage('Doing');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedStage.getText()).toBe('Doing');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Priority" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.selectPriority('High');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedPriority.getText()).toBe('High');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Status" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.selectStatus('Open');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedStatus.getText()).toBe('Open');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Effort" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.selectEffort('1');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedEffort.getText()).toBe('1');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with an "Owner" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.owner.sendKeys('Org User');
      planningModal.ownerDropdown.click();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedOwner.getText()).toBe('Org User');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with an "Assigned" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.assigned.sendKeys('Org Admin');
      planningModal.assignedDropdown.click();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedAssigned.getText()).toBe('Org Admin');
      planningModal.close_button.click();
    });

    xit('Should be able to add an item with a "Schedule" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.selectSchedule();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard();
      planningModal.title.waitReady();
    });

    it('REQ 2936: Should be able to add an item with an "Association" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle2);
      planningModal.associations.sendKeys('newTitle');
      planningModal.associationsDropdown.waitReady();
      planningModal.associationsDropdown.click();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(1);
      planningModal.title.waitReady();
      expect(browser.isElementPresent(planningModal.selectedAssociations.get(0))).toBeTruthy();
      planningModal.close_button.click();
    });

    it('REQ 2963: Should be able to see the associations in the associations tab of the modal', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.selectStatus('Open');
      planningModal.selectType('Story');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle2);
      planningModal.associations.sendKeys(newTitle);
      planningModal.associationsDropdown.waitReady();
      planningModal.associationsDropdown.click();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      browser.sleep(2000);//wait for story to save.
      planningPage.clickStoryCard(0);
      planningModal.associationTab.waitReady();
      planningModal.associationTab.click();
      planningModal.associationTitle.waitReady();
      expect(browser.isElementPresent(planningModal.associationID)).toBeTruthy();
      expect(planningModal.associationTitle.getText()).toBe(newTitle);
      expect(planningModal.associationType.getText()).toBe('Story');
      expect(planningModal.associationStatus.getText()).toBe('Open');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with a "Note" and "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.notes.sendKeys(newString);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.notes.getAttribute('value')).toBe(newString);
      planningModal.close_button.click();
    });

    it('REQ-2844: Should be able to add an item with "Blocked" checked/"Blocked Comment" and a "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.blocked.click();
      planningModal.blockedComment.clear();
      planningModal.blockedComment.sendKeys('Comment');
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.blocked.isSelected()).toBeTruthy();
      expect(planningModal.blockedComment.getAttribute('value')).toBe('Comment');
      planningModal.close_button.click();
    });

    it('Should be able to add an item with Expedited" checked and a "Title"', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.expedited.click();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.title.waitReady();
      expect(planningModal.title.getAttribute('value')).toBe(newTitle);
      expect(planningModal.expedited.isSelected()).toBeTruthy();
      planningModal.close_button.click();
    });

    it('REQ 2959: The release description should be viewable when the release is hovered over', function() {
      planningModal.title.sendKeys(newTitle);
      planningModal.releaseDropdown.click();
      browser.actions().mouseMove(planningModal.releaseResultSlugID).perform();
      expect(planningModal.releaseDescriptionHover.getText()).toBe('My Description');
      planningModal.save_button.click();
    });

  });

  describe('REQ 1992: Adding/Editing a stage should have a template of selectable colors:', function() {

    beforeEach(function() {
      planningPage.addStageButton.click();
      planningPage.addNewStageTitleBox.waitReady();
    });

    afterEach(function() {
      planningPage.cancelButton.click();
      browser.sleep(1000);//wait for animation to finish
    });

    it('Should have a light blue color option', function() {
      expect(browser.isElementPresent(element(by.css('span[style="background-color: rgb(217, 237, 247);"]')))).toBeTruthy();
    });

    it('Should have a grey color option', function() {
      expect(browser.isElementPresent(element(by.css('[style="background-color: #999e9d"]')))).toBeTruthy();
    });

    it('Should have a blue color option', function() {
      expect(browser.isElementPresent(element(by.css('[style="background-color: #7cbde8"]')))).toBeTruthy();
    });

    it('Should have a green color option', function() {
      expect(browser.isElementPresent(element(by.css('[style="background-color: #7ed6c1"]')))).toBeTruthy();
    });

    it('Should have a red color option', function() {
      expect(browser.isElementPresent(element(by.css('[style="background-color: #d67e93"]')))).toBeTruthy();
    });

    it('Should have an orange color option', function() {
      expect(browser.isElementPresent(element(by.css('[style="background-color: #e8a77c"]')))).toBeTruthy();
    });

  });

  /************************************************************************************
   *                                                                                  *
   *                                    TASKS                                         *
   *                                                                                  *
   ************************************************************************************/

  xdescribe('Tasks: ', function() {

    beforeEach(function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.clickStoryCard(0);
      planningModal.taskTab.waitReady();
      planningModal.taskTab.click();
      planningModal.addTask.click();
      planningModal.taskTitle.waitReady();
    });

    afterEach(function() {
      browser.sleep(1000);//test
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    afterEach(function() {
      planningModal.close_button.waitReady();
      planningModal.close_button.click();
    });

    it('should not be able to add a task without a title', function() {
      expect(planningModal.saveTask.isEnabled()).toBeFalsy();
      planningModal.cancelTask.click();
    });

    it('should be able to add a task with a title', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.tasks.get(0).click();
      planningModal.taskTitle.waitReady();
      expect(planningModal.taskTitle.getAttribute('value')).toBe(newTitle);
      planningModal.cancelTask.click();
    });

    it('should be able to add a task with a title and a description', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      planningModal.taskDescription.sendKeys(newString);
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.tasks.get(0).click();
      planningModal.taskTitle.waitReady();
      expect(planningModal.taskTitle.getAttribute('value')).toBe(newTitle);
      expect(planningModal.taskDescription.getAttribute('value')).toBe(newString);
      planningModal.cancelTask.click();
    });

    it('should be able to add a task with a title and a note', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      planningModal.taskNotes.sendKeys(newString);
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.tasks.get(0).click();
      planningModal.taskTitle.waitReady();
      expect(planningModal.taskTitle.getAttribute('value')).toBe(newTitle);
      expect(planningModal.taskNotes.getAttribute('value')).toBe(newString);
      planningModal.cancelTask.click();
    });

    it('should be able to add a task with a title and a priority', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      planningModal.selectPriorityTask('High');
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.tasks.get(0).click();
      planningModal.taskTitle.waitReady();
      expect(planningModal.taskTitle.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedPriorityTask.getText()).toBe('High');
      planningModal.cancelTask.click();
    });

    it('should be able to add a task with a title and an effort', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      planningModal.selectEffortTask('1');
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.tasks.get(0).click();
      planningModal.taskTitle.waitReady();
      expect(planningModal.taskTitle.getAttribute('value')).toBe(newTitle);
      expect(planningModal.selectedEffortTask.getText()).toBe('1');
      planningModal.cancelTask.click();
    });

    it('should be able to add a task with a title and an assigned person', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      planningModal.assignedTask.sendKeys('Org Admin');
      planningModal.assignedDropdownTask.click();
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.tasks.get(0).click();
      planningModal.taskTitle.waitReady();
      expect(planningModal.taskTitle.getAttribute('value')).toBe(newTitle);
      expect(planningModal.assignedDropdownSelected.getText()).toBe('Org Admin');
      planningModal.cancelTask.click();
    });

    it('should be able to delete a task', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.deleteTask(0);
      expect(planningModal.noTasks()).toBeTruthy();
    });

    it('should be able to mark a task as done', function() {
      planningModal.taskTitle.sendKeys(newTitle);
      expect(planningModal.saveTask.isEnabled()).toBeTruthy();
      planningModal.saveTask.click();
      expect(planningModal.taskIsCreatedAndPresent()).toBeTruthy();
      planningModal.taskNotCompleted.click();
      expect(browser.isElementPresent(planningModal.taskCompleted)).toBeTruthy();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                                     WALL                                         *
   *                                                                                  *
   ************************************************************************************/

  describe('Planning Wall: ', function() {

    it('REQ 1860/1863: Should be able to add/delete a new column to the planning wall', function() {
      planningPage.addStage(newStage);
      expect(planningPage.stageExists(newStage)).toBeTruthy();
      planningPage.deleteStage(newStage);
      expect(planningPage.stageExists(newStage)).toBeFalsy();
    });

    it('REQ 2849: Should be able to delete a stage if it has a story in it', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      expect(browser.isElementPresent(element(by.cssContainingText('.stage-title', 'To Do'))
        .element(by.css('button[uib-tooltip="Delete"]')))).toBeTruthy();
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    it('REQ 1862: Should be able to edit the name of an existing column', function() {
      planningPage.editStageName('To Do', 'To Do Edited');
      expect(planningPage.stageExists('To Do Edited')).toBeTruthy();
      planningPage.editStageName('To Do Edited', 'To Do');
      expect(planningPage.stageExists('To Do')).toBeTruthy();
    });

    it('REQ 1921: Should be able to see "Stage" in the filter', function() {
      planningPage.filter_button.click();
      planningPage.stageFilter.waitReady();
      expect(browser.isElementPresent(planningPage.stageFilter)).toBeTruthy();
    });

    //Drag and drop test function not working on columns in planning/delivery. Will investigate later.
    xit('REQ 1861: Should be able to reorder columns on the planning wall', function() {
      browser.actions().dragAndDrop(planningPage.toDoStage, planningPage.doingStage).perform();
    });
  });

  /**
   * Planning Wall Story Cards
   */

  describe('Planning Wall Story Cards: ', function() {

    it('REQ 2912: Should be able to configure wall to turn off story card descriptions', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.description.sendKeys('STORY DESCRIPTION');
      planningModal.save_button.click();
      planningPage.storyDescription.waitReady();
      expect(planningPage.storyDescription.getText()).toBe('STORY DESCRIPTION');
      helper.getUrl(org_url + workspace + 'admin/configuration/planning/');//Go to configurations page
      //configurationPage.hideDescription.waitReady(); Doesn't find the element with waitReady so use browser.sleep
      browser.sleep(1500);
      configurationPage.hideDescription.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady();
      expect(browser.isElementPresent(planningPage.storyDescription)).toBeFalsy();
      helper.getUrl(org_url + workspace + 'admin/configuration/planning/');//Go to configurations page
      //configurationPage.hideDescription.waitReady(); Doesn't find the element with waitReady so use browser.sleep
      browser.sleep(1500);
      configurationPage.hideDescription.click();
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    it('REQ 2052: Should show no user icon when there is no one assigned to the story', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      expect(browser.isElementPresent(planningPage.storyCardUserIcon)).toBeFalsy();
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    it('REQ 2052: Should show a user icon when there is someone assigned to the story', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.assigned.sendKeys('Org Admin');
      planningModal.assignedDropdown.click();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      expect(browser.isElementPresent(planningPage.storyCardUserIcon)).toBeTruthy();
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    it('REQ 2255: Delete button on the story card is only shown when hovered over', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      expect(planningPage.storyCards.get(0).element(by.css('button[uib-tooltip="Delete"]')).isDisplayed()).toBeFalsy();
      browser.actions().mouseMove(planningPage.storyCards.get(0)).perform();
      expect(planningPage.storyCards.get(0).element(by.css('button[uib-tooltip="Delete"]')).isDisplayed()).toBeTruthy();
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

    it('REQ 2910: Should be able to delete a single story by clicking the delete button on the story card', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      planningPage.deleteStory();
      expect(planningPage.storyCards.count()).toBe(0);
    });

    it('REQ 2927: Should display "No Message Entered" when the blocked comment field is empty', function() {
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      planningModal.title.sendKeys(newTitle);
      planningModal.blocked.click();
      planningModal.blockedComment.clear();
      planningModal.save_button.click();
      expect(planningPage.storyIsCreatedAndPresent()).toBeTruthy();
      expect(browser.isElementPresent(planningPage.noMsgEntered.getText())).toBeTruthy();
      helper.getUrl(org_url + workspace + 'planning/');
      planningBacklog.clearBacklog();
    });

  });

});
