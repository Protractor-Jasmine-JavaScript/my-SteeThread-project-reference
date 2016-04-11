/**
 */
'use strict';

var org_user = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
var ListPage = require('./../../pages/list_page.js');
var MenuPage = require('./../../pages/menuItem_page');
var CommonPage = require('./../../pages/common_item_page');
var ConfigurationPage = require('./../../pages/configurations_page.js');

require('../../helpers/waitReady.js');

describe('Org Admin: ', function() {
  var loginPage;
  var menuPage;
  var commonPage;
  var listPage;
  var configPage;
  var newList;
  var newItem;

  beforeEach(function() {
    loginPage = new LoginPage();
    menuPage = new MenuPage();
    commonPage = new CommonPage();
    listPage = new ListPage();
    configPage = new ConfigurationPage();
    newList = 'newList-' + Date.now();
    newItem = 'newItem-' + Date.now();
    helper.login(orgAdmin.username, orgAdmin.password);
    helper.getUrl(org_url + workspace + 'lists/');
  });

  afterEach(function() {
    listPage.deleteAllLists();
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                                   LISTS                                          *
   *                                                                                  *
   ************************************************************************************/

  describe('Lists:', function() {

    //beforeEach(function() {
    //  listPage.addNewListBox.sendKeys(newList);
    //  listPage.addListButton.click();
    //});

  });

  /************************************************************************************
   *                                                                                  *
   *                                   TASKS                                          *
   *                                                                                  *
   ************************************************************************************/

  describe('Tasks:', function() {

    beforeEach(function() {
      listPage.addNewListBox.waitReady();
      listPage.addNewListBox.sendKeys(newList);
      listPage.addListButton.click();
      listPage.clickOnNewList();
      listPage.add_button.waitReady();
      listPage.add_button.click();
      listPage.taskModalTitle.waitReady();
    });

    afterEach(function() {
      //helper.getUrl(org_url + workspace + 'lists/');
    });

    it('Should be able to view the new task item', function() {
      listPage.enterItemTitle(newItem);
      listPage.saveModalButton.click();
      expect(listPage.getTextFromTask(0)).toBe(newItem);
    });

    it('Should be able to delete a task item', function() {
      listPage.enterItemTitle(newItem);
      listPage.saveModalButton.click();
      expect(listPage.getTextFromTask(0)).toBe(newItem);
      listPage.deleteSelectedTask(0);
      expect(listPage.isListEmpty()).toBeTruthy();
    });

    /************************************************************************************
     *                                                                                  *
     *                                  TASK MODAL                                      *
     *                                                                                  *
     ************************************************************************************/

    describe('Task Modal: ', function() {

      it('Should able to open and see the title of the task item modal', function() {
        expect(listPage.getAddItemModalTitle()).toBe('Add Item');
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Title" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalTitle)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Description" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalDescription)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Schedule" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalSchedule)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Priority" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalPriority)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Assigned" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalAssigned)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Tags" in the item modal', function() {
        expect(browser.isElementPresent(listPage.splitViewTags)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Attachment" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalAttachment)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to see "Notes" in the item modal', function() {
        expect(browser.isElementPresent(listPage.taskModalNotes)).toBeTruthy();
        listPage.cancelModalButton.click();
      });

      it('Should not be able to save until required fields have been entered', function() {
        expect(listPage.saveModalButton.isEnabled()).toBeFalsy();
        listPage.cancelModalButton.click();
      });

      it('Should be able to save with form requirements met', function() {
        listPage.enterItemTitle(newItem);
        expect(listPage.saveModalButton.isEnabled()).toBeTruthy();
        listPage.saveModalButton.click();
      });

      it('Should able to cancel the modal using x button', function() {
        listPage.cancelModalButton.click();
        expect(listPage.add_button.isEnabled()).toBeTruthy();
      });
    });

    /************************************************************************************
     *                                                                                  *
     *                               TASK SPLIT VIEW                                    *
     *                                                                                  *
     ************************************************************************************/

    describe('Split View: ', function() {

      beforeEach(function() {
        listPage.enterItemTitle(newItem);
        listPage.saveModalButton.click();
        listPage.firstTaskItem.click();
        listPage.splitViewDescription.waitReady('withRefresh');
      });

      afterEach(function() {
        helper.getUrl(org_url + workspace + 'lists/');
      });

      it('REQ 2986: Adding a tag to a task has a notification', function() {
        listPage.splitViewTags.click();
        browser.actions().sendKeys('newTag', protractor.Key.ENTER).perform();
        expect(listPage.existingTag.getText()).toBe('newTag');
        element(by.binding('toaster.body')).waitReady();
        expect(element.all(by.binding('toaster.body')).get(1).getText()).toBe('Tag newTag has been created');
        helper.getUrl(org_url + workspace + 'admin/configuration/general/');
        configPage.deleteTag();
      });

      it('Should show the "Description" field', function() {
        expect(browser.isElementPresent(listPage.splitViewDescription)).toBeTruthy();
      });

      it('Should show the "Owner" field', function() {
        listPage.splitViewOwner.waitReady();
        expect(browser.isElementPresent(listPage.splitViewOwner)).toBeTruthy();
      });

      it('Should show the "Assigned" field', function() {
        expect(browser.isElementPresent(listPage.splitViewAssigned)).toBeTruthy();
      });

      it('Should show the "Priority" field', function() {
        expect(browser.isElementPresent(listPage.splitViewPriority)).toBeTruthy();
      });

      it('Should show the "Start Date - Due Date" field', function() {
        expect(browser.isElementPresent(listPage.splitViewSchedule)).toBeTruthy();
      });

      it('Should show the "Notes" field', function() {
        expect(browser.isElementPresent(listPage.splitViewNotes)).toBeTruthy();
      });

      it('Should show the "Tags" field', function() {
        expect(browser.isElementPresent(listPage.splitViewTags)).toBeTruthy();
      });

      it('Should show the "Attachments" field', function() {
        expect(browser.isElementPresent(listPage.splitViewAttachment)).toBeTruthy();
      });

      /************************************************************************************
       *                                                                                  *
       *                                   SUBTASKS                                       *
       *                                                                                  *
       ************************************************************************************/

      describe('TaskList: ', function() {

        it('REQ 3051: Should be able to add a tag to a task item', function() {
          listPage.addNewTaskItemButton.click();
          listPage.taskModalTitle.waitReady();
          listPage.taskModalTitle.sendKeys('taskTag');
          listPage.taskModalTags.click();
          browser.actions().sendKeys('newTag', protractor.Key.ENTER).perform();
          listPage.saveModalButton.click();
          listPage.subTaskTitle.waitReady();
          listPage.tasks.get(0).element(by.binding('subTask.title')).click();
          listPage.taskModalTitle.waitReady();
          expect(listPage.existingTag.getText()).toBe('newTag');
          listPage.cancelModalButton.click();
          helper.getUrl(org_url + workspace + 'admin/configuration/general/');
          configPage.deleteTag();
        });

      });

    });

  });

});
