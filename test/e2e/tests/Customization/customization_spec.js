'use strict';
/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;
var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
var CustomFieldPage = require('./../../pages/custom_field_page.js');
var MenuPage = require('./../../pages/menuItem_page');
var PlanningPage = require('./../../pages/planning_page');
var PlanningModalPage = require('./../../pages/planning_modal_page');
var ListPage = require('./../../pages/list_page.js');
require('../../helpers/waitReady.js');

/************************************************************************************
 *                                                                                  *
 *                               CUSTOMIZABLE ITEMS                                 *
 *                                                                                  *
 ************************************************************************************/

describe('Customized Options', function() {
  var loginPage;
  var planningPage;
  var menuPage;
  var newValue;
  var customFieldPage;
  var planningModal;
  var listPage;

  beforeEach(function() {
    loginPage = new LoginPage();
    customFieldPage = new CustomFieldPage();
    menuPage = new MenuPage();
    planningPage = new PlanningPage();
    planningModal = new PlanningModalPage();
    listPage = new ListPage();

    newValue = 'NewVal-' + Date.now();
    helper.login(org_admin.username, org_admin.password);
    helper.getUrl(org_url + workspace);
    //menuPage.hoverAndClickOnCustomField();
    helper.getUrl(org_url + workspace + 'admin/customization/fields/');
    customFieldPage.customize_value.waitReady('withRefresh');
    customFieldPage.customize_value.click();
  });

  afterEach(function() {
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                        CUSTOMIZABLE LIST PRIORITY ITEMS                          *
   *                                                                                  *
   ************************************************************************************/

  describe('List Priority Options', function() {

    beforeEach(function() {
      customFieldPage.listItems.waitReady();
      customFieldPage.listItems.click();
    });

    it('REQ 2998: Can add and delete customizable list priority options', function() {
      customFieldPage.enterOptionBox.waitReady();
      customFieldPage.enterOptionBox.sendKeys('ONLYFORLIST');
      customFieldPage.addOptionButton.click();
      menuPage.list_menuItem.click();
      listPage.addNewListBox.waitReady();
      listPage.addNewListBox.sendKeys('testingPriority');
      listPage.addListButton.click();
      listPage.clickOnNewList();
      listPage.add_button.waitReady();
      listPage.add_button.click();
      listPage.taskModalTitle.waitReady();
      listPage.taskModalPriority.click();
      expect(browser.isElementPresent(element(by.cssContainingText('.ui-select-choices-row', 'ONLYFORLIST')))).toBeTruthy();
      listPage.cancelModalButton.click();
      helper.getUrl(org_url + workspace + 'admin/customization/values/');
      customFieldPage.listItems.waitReady();
      customFieldPage.listItems.click();
      customFieldPage.deleteOption('ONLYFORLIST');
      menuPage.list_menuItem.click();
      listPage.addListButton.waitReady();
      browser.actions().mouseMove(listPage.addListButton).perform();
      listPage.deleteAllLists();
    });

  });

  /************************************************************************************
   *                                                                                  *
   *                       PRIORITY PLANNING CUSTOMIZATION                            *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 1940: Priority Field', function() {

    beforeEach(function() {
      customFieldPage.planningPriorityOption.click();
    });

    it('Should have modifiable values', function() {
      customFieldPage.optionExists().then(function(optionExists) {
        if (!optionExists) {
          customFieldPage.enterOptionBox.sendKeys(newValue + '-1');
          customFieldPage.addOptionButton.click();
        }
        customFieldPage.getFirstOptionText().then(function(oldValue) {
          browser.sleep(1000);
          customFieldPage.firstOptionText.click();
          customFieldPage.firstOptionText.clear();
          customFieldPage.firstOptionText.sendKeys(newValue);
          menuPage.hoverAndClickOnPlanningWall();
          planningPage.addStoryButton.waitReady('withRefresh');
          planningPage.addStoryButton.click();
          expect(planningModal.priorityOptionExists(newValue)).toBeTruthy();
          planningModal.close_button.click();
          helper.getUrl(org_url + workspace + 'admin/customization/fields/');
          customFieldPage.customize_value.waitReady('withRefresh');
          customFieldPage.customize_value.click();
          customFieldPage.planningPriorityOption.click();
          customFieldPage.firstOptionOfOptions.click();
          customFieldPage.firstOptionOfOptions.clear();
          customFieldPage.firstOptionOfOptions.sendKeys(oldValue);
        });
      });
    });

    it('Should be able to add values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.addOptionButton.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.priorityOptionExists(newValue)).toBeTruthy();
      planningModal.close_button.click();
      helper.getUrl(org_url + workspace + 'admin/customization/fields/');
      customFieldPage.customize_value.waitReady('withRefresh');
      customFieldPage.customize_value.click();
      customFieldPage.planningPriorityOption.click();
      customFieldPage.deleteOption(newValue);
    });

    it('Should be able to delete values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.addOptionButton.click();
      customFieldPage.deleteOption(newValue);
      browser.sleep(1000);
      helper.getUrl(org_url + workspace + 'planning/wall/');
      //menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.priorityOptionExists(newValue)).toBeFalsy();
      planningModal.close_button.click();
    });

    it('Should be able to reorder values', function() {
      // customFieldPage.enterOptionBox.sendKeys(newValue);
      // customFieldPage.addOptionButton.click();
      var secondItemText = customFieldPage.getFirstOptionText();
      browser.actions().dragAndDrop(customFieldPage.dragStart, {x:0, y:-50}).perform();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.priority_dropdown.click();
      expect(element.all(by.repeater('priority in $select.items')).get(1).getText()).toBe(secondItemText);
      planningModal.close_button.click();
    });

    it('REQ 2183: Should be able to set a default value', function() {
      var defaultValueText = customFieldPage.getFirstOptionText();
      customFieldPage.firstOptionDefaultValue.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      expect(planningModal.selectedPriority.getText()).toBe(defaultValueText);
      planningModal.close_button.click();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                       TYPE PLANNING CUSTOMIZATION                                *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 1941: Type Field', function() {

    beforeEach(function() {
      customFieldPage.planningTypeOption.click();
    });

    it('Should have modifiable values', function() {
      customFieldPage.optionExists().then(function(optionExists) {
        if (!optionExists) {
          customFieldPage.enterOptionBox.sendKeys(newValue + '-1');
          customFieldPage.addOptionButton.click();
        }
        customFieldPage.getFirstOptionText().then(function(oldValue) {
          customFieldPage.firstOptionText.click();
          customFieldPage.firstOptionText.clear();
          customFieldPage.firstOptionText.sendKeys(newValue);
          menuPage.hoverAndClickOnPlanningWall();
          planningPage.addStoryButton.waitReady('withRefresh');
          planningPage.addStoryButton.click();
          expect(planningModal.typeOptionExists(newValue)).toBeTruthy();
          planningModal.close_button.click();
          helper.getUrl(org_url + workspace + 'admin/customization/fields/');
          customFieldPage.customize_value.waitReady('withRefresh');
          customFieldPage.customize_value.click();
          customFieldPage.planningTypeOption.click();
          customFieldPage.firstOptionOfOptions.click();
          customFieldPage.firstOptionOfOptions.clear();
          customFieldPage.firstOptionOfOptions.sendKeys(oldValue);
        });
      });
    });

    it('Should be able to add values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.addOptionButton.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.typeOptionExists(newValue)).toBeTruthy();
      planningModal.close_button.click();
      helper.getUrl(org_url + workspace + 'admin/customization/fields/');
      customFieldPage.customize_value.waitReady('withRefresh');
      customFieldPage.customize_value.click();
      customFieldPage.planningTypeOption.click();
      customFieldPage.deleteOption(newValue);
    });

    it('Should be able to delete values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.addOptionButton.click();
      customFieldPage.deleteOption(newValue);
      browser.sleep(1000);
      helper.getUrl(org_url + workspace + 'planning/wall/');
      //menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.typeOptionExists(newValue)).toBeFalsy();
      planningModal.close_button.click();
    });

    it('Should be able to reorder values', function() {
      // customFieldPage.enterOptionBox.sendKeys(newValue);
      // customFieldPage.addOptionButton.click();
      var secondItemText = customFieldPage.getFirstOptionText();
      browser.actions().dragAndDrop(customFieldPage.dragStart, {x:0, y:-50}).perform();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.type_dropdown.click();
      expect(element.all(by.repeater('type in $select.items')).get(1).getText()).toBe(secondItemText);
      planningModal.close_button.click();
    });

    it('REQ 2183: Should be able to set a default value', function() {
      var defaultValueText = customFieldPage.getFirstOptionText();
      customFieldPage.firstOptionDefaultValue.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      expect(planningModal.selectedType.getText()).toBe(defaultValueText);
      planningModal.close_button.click();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                         STATUS PLANNING CUSTOMIZATION                            *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 1891: Status field', function() {

    beforeEach(function() {
      customFieldPage.planningStatusOption.click();
    });

    it('Should have modifiable values', function() {
      customFieldPage.optionExists().then(function(optionExists) {
        if (!optionExists) {
          customFieldPage.enterOptionBox.sendKeys(newValue + '-1');
          customFieldPage.addOptionButton.click();
        }
        customFieldPage.getFirstOptionText().then(function(oldValue) {
          customFieldPage.firstOptionText.click();
          customFieldPage.firstOptionText.clear();
          customFieldPage.firstOptionText.sendKeys(newValue);
          menuPage.hoverAndClickOnPlanningWall();
          planningPage.addStoryButton.waitReady('withRefresh');
          planningPage.addStoryButton.click();
          expect(planningModal.statusOptionExists(newValue)).toBeTruthy();
          planningModal.close_button.click();
          helper.getUrl(org_url + workspace + 'admin/customization/fields/');
          customFieldPage.customize_value.waitReady('withRefresh');
          customFieldPage.customize_value.click();
          customFieldPage.planningStatusOption.click();
          customFieldPage.firstOptionOfOptions.click();
          customFieldPage.firstOptionOfOptions.clear();
          customFieldPage.firstOptionOfOptions.sendKeys(oldValue);
        });
      });
    });

    it('Should be able to add values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.addOptionButton.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.statusOptionExists(newValue)).toBeTruthy();
      planningModal.close_button.click();
      helper.getUrl(org_url + workspace + 'admin/customization/fields/');
      customFieldPage.customize_value.waitReady('withRefresh');
      customFieldPage.customize_value.click();
      customFieldPage.planningStatusOption.click();
      customFieldPage.deleteOption(newValue);
    });

    it('Should be able to delete values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.addOptionButton.click();
      customFieldPage.deleteOption(newValue);
      browser.sleep(1000);
      helper.getUrl(org_url + workspace + 'planning/wall/');
      //menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.statusOptionExists(newValue)).toBeFalsy();
      planningModal.close_button.click();
    });

    it('Should be able to reorder values', function() {
      // customFieldPage.enterOptionBox.sendKeys(newValue);
      // customFieldPage.addOptionButton.click();
      var secondItemText = customFieldPage.getFirstOptionText();
      browser.actions().dragAndDrop(customFieldPage.dragStart, {x:0, y:-50}).perform();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.status_dropdown.click();
      expect(element.all(by.repeater('status in $select.items')).get(1).getText()).toBe(secondItemText);
      planningModal.close_button.click();
    });

    it('REQ 2183: Should be able to set a default value', function() {
      var defaultValueText = customFieldPage.getFirstOptionText();
      customFieldPage.firstOptionDefaultValue.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      expect(planningModal.selectedStatus.getText()).toBe(defaultValueText);
      planningModal.close_button.click();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                       EFFORT PLANNING CUSTOMIZATION                              *
   *                                                                                  *
   ************************************************************************************/

  describe('REQ 2055: Effort Field', function() {

    beforeEach(function() {
      customFieldPage.planningEffortOption.click();
    });

    it('Should have modifiable values', function() {
      customFieldPage.optionExists().then(function(optionExists) {
        if (!optionExists) {
          customFieldPage.enterOptionBox.sendKeys(newValue + '-1');
          customFieldPage.value_editBox.sendKeys(helper.getRandomNumber(5));
          customFieldPage.addValueAndOption_button.click();
        }
        customFieldPage.getFirstOptionText().then(function(oldValue) {
          customFieldPage.firstOptionText.click();
          customFieldPage.firstOptionText.clear();
          customFieldPage.firstOptionText.sendKeys(newValue);
          menuPage.hoverAndClickOnPlanningWall();
          planningPage.addStoryButton.waitReady('withRefresh');
          planningPage.addStoryButton.click();
          expect(planningModal.effortOptionExists(newValue)).toBeTruthy();
          planningModal.close_button.click();
          helper.getUrl(org_url + workspace + 'admin/customization/fields/');
          customFieldPage.customize_value.waitReady('withRefresh');
          customFieldPage.customize_value.click();
          customFieldPage.planningEffortOption.click();
          customFieldPage.firstOptionOfOptions.click();
          customFieldPage.firstOptionOfOptions.clear();
          customFieldPage.firstOptionOfOptions.sendKeys(oldValue);
        });
      });
    });

    it('Should be able to add values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.value_editBox.sendKeys(helper.getRandomNumber(5));
      customFieldPage.addValueAndOption_button.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.effortOptionExists(newValue)).toBeTruthy();
      planningModal.close_button.click();
      helper.getUrl(org_url + workspace + 'admin/customization/fields/');
      customFieldPage.customize_value.waitReady('withRefresh');
      customFieldPage.customize_value.click();
      customFieldPage.planningEffortOption.click();
      customFieldPage.deleteOption(newValue);
    });

    it('Should be able to delete values', function() {
      customFieldPage.enterOptionBox.sendKeys(newValue);
      customFieldPage.value_editBox.sendKeys(helper.getRandomNumber(5));
      customFieldPage.addValueAndOption_button.click();
      customFieldPage.deleteOption(newValue);
      browser.sleep(1000);
      helper.getUrl(org_url + workspace + 'planning/wall/');
      //menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      expect(planningModal.effortOptionExists(newValue)).toBeFalsy();
      planningModal.close_button.click();
    });

    it('Should be able to reorder values', function() {
      // customFieldPage.enterOptionBox.sendKeys(newValue);
      // customFieldPage.value_editBox.sendKeys(helper.getRandomNumber(5));
      // customFieldPage.addValueAndOption_button.click();
      var secondItemText = customFieldPage.getFirstOptionText();
      browser.actions().dragAndDrop(customFieldPage.dragStart, {x:0, y:-50}).perform();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.effort_dropdown.click();
      expect(element.all(by.repeater('effort in $select.items')).get(1).getText()).toBe(secondItemText);
      planningModal.close_button.click();
    });

    it('REQ 2183: Should be able to set a default value', function() {
      var defaultValueText = customFieldPage.getFirstOptionText();
      customFieldPage.firstOptionDefaultValue.click();
      menuPage.hoverAndClickOnPlanningWall();
      planningPage.addStoryButton.waitReady('withRefresh');
      planningPage.addStoryButton.click();
      planningModal.title.waitReady();
      expect(planningModal.selectedEffort.getText()).toBe(defaultValueText);
      planningModal.close_button.click();
    });
  });
});
