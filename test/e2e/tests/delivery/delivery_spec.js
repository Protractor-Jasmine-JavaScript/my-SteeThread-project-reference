'use strict';
/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var orgUser = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var orgUserObserver = browser.params.users.orgUserObserver;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;
var release = browser.params.release.release_name;
var DeliveryPage = require('./../../pages/delivery_page.js');
var MenuPage = require('./../../pages/menuItem_page.js');
var CommonPage = require('./../../pages/common_item_page.js');
var helper = require('../../helpers/helper.js');
require('../../helpers/waitReady.js');

/************************************************************************************
 *                                                                                  *
 *                              DELIVERY PIPELINE                                   *
 *                                                                                  *
 ************************************************************************************/

describe('Delivery Pipeline', function() {
  var common;
  var deliveryPage;
  var menu;
  var newPipelineTitle;

  beforeEach(function() {
    deliveryPage = new DeliveryPage();
    menu = new MenuPage();
    common = new CommonPage();
    newPipelineTitle = 'NewPipeline-' + Date.now();
  });

  afterEach(function() {
    helper.logout();
  });

  it('REQ 1988: Delivery menu item should exist', function() {
    helper.login(orgAdmin.username, orgAdmin.password);
    helper.getUrl(org_url + workspace);
    expect(menu.delivery_menuItem.isPresent()).toBeTruthy();
  });

  it('Org observer should not be able to see Add button on delivery page', function() {
    helper.login(orgUserObserver.username, orgUserObserver.password);
    helper.getUrl(org_url + workspace);
    menu.delivery_menuItem.waitReady();
    expect(menu.delivery_menuItem.isPresent()).toBeTruthy();
    menu.delivery_menuItem.click();
    expect(common.addButton.isPresent()).toBeFalsy();
  });

  /************************************************************************************
   *                                                                                  *
   *                           GENERAL PIPELINE FUNCTIONS                             *
   *                                                                                  *
   ************************************************************************************/

  describe('Pipelines:', function() {

    beforeEach(function() {
      helper.login(orgAdmin.username, orgAdmin.password);
      helper.getUrl(org_url + workspace);
      menu.delivery_menuItem.waitReady('withRefresh');
      menu.delivery_menuItem.click();
    });

    it('REQ 2960: Release description should be viewable when hovered over', function() {
      common.addButton.click();
      deliveryPage.pipelineReleaseDropdown.waitReady();
      deliveryPage.pipelineReleaseDropdown.click();
      browser.actions().mouseMove(deliveryPage.pipelineReleaseResultSlugID).perform();
      expect(deliveryPage.pipelineReleaseDescriptionHover.getText()).toBe('My Description');
      deliveryPage.cancelButton.click();
      common.addButton.waitReady();
    });

    it('REQ 2183: Should be able to add a pipeline', function() {
      deliveryPage.addPipeline(newPipelineTitle);
      expect(deliveryPage.pipelines.get(0).element(by.css('.portlet-title')).getText()).toBe(newPipelineTitle);
      deliveryPage.deleteSpecificPipeline(newPipelineTitle);
    });

    it('REQ 2807: Should be able to edit a pipeline title', function() {
      deliveryPage.addAndConfigurePipeline(newPipelineTitle);
      deliveryPage.editPipelineTitle(newPipelineTitle + '_update');
      deliveryPage.configureReturnToPipeline.waitReady();
      expect(element.all(by.binding('::item.value')).get(1).getText()).toBe(newPipelineTitle + '_update');
      deliveryPage.configureReturnToPipeline.click();
      expect(element(by.binding('::dashboard.pipeline.title')).getText()).toBe(newPipelineTitle + '_update');
      element(by.buttonText('Delete Pipeline')).click();
      deliveryPage.deleteButton.waitReady();
      deliveryPage.deleteButton.click();
    });

    it('REQ 2935: Should disable save when the global vars have not yet been saved', function() {
      common.addButton.click();
      deliveryPage.pipelineTitleBox.waitReady();
      deliveryPage.pipelineTitleBox.sendKeys('PIPELINE TITLE');
      expect(deliveryPage.save_button.isEnabled()).toBeTruthy();
      deliveryPage.globalVarParamBox.sendKeys('Parameter');
      deliveryPage.globalVarValueBox.sendKeys('Value');
      expect(deliveryPage.save_button.isEnabled()).toBeFalsy();
      deliveryPage.addGlobalVar.click();
      //deliveryPage.globalVars.waitReady(); Doesn't work
      browser.sleep(1000);
      expect(deliveryPage.save_button.isEnabled()).toBeTruthy();
      deliveryPage.cancelButton.click();
      common.addButton.waitReady();
    });

    it('REQ 2803: Should be able to delete a pipeline at the pipeline configure page', function() {
      deliveryPage.addPipeline(newPipelineTitle);
      deliveryPage.deleteSpecificPipeline(newPipelineTitle);
      expect(browser.isElementPresent(element(by.css('i.fa.fa-ban')))).toBeTruthy();
    });

    it('REQ 2821: Should be able to drag and drop a pipeline', function() {
      deliveryPage.addPipeline('title1');
      deliveryPage.addPipeline('title2');
      var dragStart = element.all(by.css('i.fa.fa-ellipsis-v.sort-handle')).get(0);
      var dragStop = element.all(by.css('i.fa.fa-ellipsis-v.sort-handle')).get(1);
      browser.actions().dragAndDrop(dragStart, dragStop).perform();
      expect(deliveryPage.pipelines.get(0).element(by.css('.portlet-title')).getText()).toBe('title1');
      deliveryPage.deleteSpecificPipeline('title1');
      deliveryPage.deleteSpecificPipeline('title2');
    });

    it('REQ 2813: Should be able to Return to Pipeline and Return to Delivery from delivery menus', function() {
      var pipeName = 'Pipe1';
      deliveryPage.addAndConfigurePipeline(pipeName);
      deliveryPage.configureReturnToPipeline.waitReady();
      expect(browser.isElementPresent(deliveryPage.configureReturnToPipeline)).toBeTruthy();
      deliveryPage.configureReturnToPipeline.click();
      deliveryPage.pipelineReturnToDelivery.waitReady();
      expect(browser.isElementPresent(deliveryPage.pipelineReturnToDelivery)).toBeTruthy();
      deliveryPage.pipelineReturnToDelivery.click();
      expect(element(by.binding('pipeline.title')).getText()).toBe(pipeName);
      deliveryPage.deleteSpecificPipeline(pipeName);
    });

    it('REQ 2880: Should be able to enable/disable a pipeline', function() {
      deliveryPage.addAndConfigurePipeline(newPipelineTitle);
      deliveryPage.disablePipeline.waitReady();
      deliveryPage.disablePipeline.click();
      deliveryPage.configureReturnToPipeline.click();
      deliveryPage.pipelineTitle.waitReady();
      expect(element(by.css('span.bold.text-muted')).getText()).toContain('Disabled');
      expect(browser.isElementPresent(deliveryPage.runPipeline)).toBeFalsy();
      deliveryPage.configurePipelineButton.click();
      deliveryPage.enablePipeline.waitReady();
      deliveryPage.enablePipeline.click();
      deliveryPage.configureReturnToPipeline.click();
      deliveryPage.pipelineReturnToDelivery.waitReady();
      deliveryPage.pipelineReturnToDelivery.click();
      deliveryPage.deleteSpecificPipeline(newPipelineTitle);
    });

    it('REQ 2904: Should be able to add an upstream pipeline to another pipeline', function() {
      deliveryPage.addPipeline('first pipeline');
      deliveryPage.addPipeline('second pipeline');
      deliveryPage.configurePipeline('second pipeline');
      deliveryPage.editPipelineButton.waitReady();
      deliveryPage.editPipelineButton.click();
      deliveryPage.upstreamPipelineBox.waitReady();
      deliveryPage.upstreamPipelineBox.click();
      deliveryPage.upstreamPipelineBox.sendKeys('first pipeline');
      deliveryPage.upstreamPipelineDropdown.waitReady();
      deliveryPage.upstreamPipelineDropdown.click();
      deliveryPage.save_button.click();
      deliveryPage.configureReturnToPipeline.waitReady();
      deliveryPage.configureReturnToPipeline.click();
      deliveryPage.upstreamPipeline.waitReady();
      expect(element(by.css('h4')).getText()).toBe('Upstream Pipelines');
      expect(deliveryPage.upstreamPipeline.getText()).toContain('first pipeline');
      deliveryPage.upstreamPipeline.click();
      deliveryPage.downstreamPipeline.waitReady();
      expect(element(by.css('h4')).getText()).toBe('Downstream Pipelines');
      expect(deliveryPage.downstreamPipeline.getText()).toContain('second pipeline');
      deliveryPage.pipelineReturnToDelivery.click();
      deliveryPage.deleteSpecificPipeline('first pipeline');
      deliveryPage.deleteSpecificPipeline('second pipeline');
    });

  });

  /************************************************************************************
   *                                                                                  *
   *                   ORG ADMIN PERMISSION CHECKS FOR DELIVERY                       *
   *                                                                                  *
   ************************************************************************************/

  describe('Org Admin', function() {

    var newPhaseTitleOne;
    var newPhaseTitleTwo;
    var newStepTitleOne;
    var newStageTitleOne;
    var newStageTitleTwo;
    var newActionOne;
    var newActionTwo;

    beforeEach(function() {
      newPhaseTitleOne = 'newPhaseOne-' + Date.now();
      newPhaseTitleTwo = 'newPhaseTwo-' + Date.now();
      newStageTitleOne = 'newStageOne-' + Date.now();
      newStageTitleTwo = 'newStageTwo-' + Date.now();
      newStepTitleOne = 'newStepOne-' + Date.now();
      newActionOne = {title: 'newActionOne-' + Date.now(), url: 'http://steelthread.com'};
      newActionTwo = {title: 'newActionTwo-' + Date.now(), url: 'http://steelthread.com'};

      helper.login(orgAdmin.username, orgAdmin.password);
      helper.getUrl(org_url + workspace);
      menu.delivery_menuItem.waitReady('withRefresh');
      menu.delivery_menuItem.click();
      deliveryPage.addAndConfigurePipeline(newPipelineTitle);
    });

    afterEach(function() {
      deliveryPage.deletePipeline();
    });

    it('REQ 2217: Should be able to see the pipeline name in the breadcrumb', function() {
      expect(common.breadcrumb.getText()).toContain(newPipelineTitle);
    });

    /************************************************************************************
     *                                                                                  *
     *                                    PHASE                                         *
     *                                                                                  *
     ************************************************************************************/

    describe('Phase: ', function() {

      it('REQ 1990: Should be able to create phase', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        expect(element(by.cssContainingText('strong.ng-binding', newPhaseTitleOne)).isPresent()).toBeTruthy();
      });

      it('REQ 1994: Should be able to delete a phase', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.deleteByPhase(newPhaseTitleOne);
        expect(browser.isElementPresent(element(by.
        cssContainingText('strong.ng-binding', newPhaseTitleOne)))).toBeFalsy();
      });

      //@TODO drag and drop function doesn't work with phases, skipping for now.
      xit('REQ 2012: Should be able to drag and drop phases', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addPhase(newPhaseTitleTwo);
        var dragNewColumn = deliveryPage.getPhaseByColumnNumber(0);
        var dropLocation = deliveryPage.getPhaseByColumnNumber(1);
        browser.actions().dragAndDrop(dragNewColumn, dropLocation).perform();
        expect(deliveryPage.getPhaseByColumnNumber(0).getText()).toBe(newPhaseTitleTwo);
      });

    });

    /************************************************************************************
     *                                                                                  *
     *                                    STAGE                                         *
     *                                                                                  *
     ************************************************************************************/

    describe('Stage: ', function() {

      it('REQ 2241: Should be able to add a stage', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStageOnPhase(newPhaseTitleOne, newStageTitleOne);
        expect(deliveryPage.phaseHasStage(newPhaseTitleOne, newStageTitleOne)).toBeTruthy();
      });

      it('REQ 2246: Should be able reorder stages between phases', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addPhase(newPhaseTitleTwo);
        deliveryPage.addStageOnPhase(newPhaseTitleOne, newStageTitleOne);
        deliveryPage.getPhaseStageOrStepByTitle(newStageTitleOne).then(function(stage) {
          var dragStart = stage.element(by.binding('item.title'));
          deliveryPage.getPhaseByTitle(newPhaseTitleTwo).then(function(phase) {
            var dragStop = phase.element(by.model('phase.items'));
            browser.actions().dragAndDrop(dragStart, dragStop).perform();
            expect(deliveryPage.phaseHasStage(newPhaseTitleTwo, newStageTitleOne)).toBeTruthy();
          });
        });
      });

    });

    /************************************************************************************
     *                                                                                  *
     *                                     STEP                                         *
     *                                                                                  *
     ************************************************************************************/

    describe('Step: ', function() {

      it('REQ 2004: Should be able to add a step', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        expect(deliveryPage.phaseHasStep(newPhaseTitleOne, newStepTitleOne)).toBeTruthy();
      });

      //browser.actions.mouseMove() stopped working so this test will be skipped for now.
      xit('REQ 2003: Should be able to delete a step ', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.deleteStepInPhase(newStepTitleOne).then(function() {
          expect(browser.isElementPresent(element(by.cssContainingText('p.ng-binding', newStepTitleOne)))).toBeFalsy();
        });
      });

      it('REQ 2244: Should be able to add a step', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStageOnPhase(newPhaseTitleOne, newStageTitleOne);
        deliveryPage.addStepOnStage(newStageTitleOne, newStepTitleOne);
        expect(deliveryPage.stageHasStep(newStageTitleOne, newStepTitleOne)).toBeTruthy();
      });

      it('REQ 2004: Should be able to update a step', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.updateStepOnPhase(newPhaseTitleOne, newStepTitleOne + '_updated');
        expect(deliveryPage.phaseHasStep(newPhaseTitleOne, newStepTitleOne + '_updated')).toBeTruthy();
      });

      it('REQ 2001: Should be able to add an action to delivery step', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.addActionOnStep(newPhaseTitleOne, newActionOne.title, newActionOne.url);
        expect(deliveryPage.hasAction(newActionOne.title)).toBeTruthy();
        common.cancelModalButton.click();
      });

      it('REQ 2094: Halt option should exist', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.openNewStepModalOnPhase(newPhaseTitleOne);
        browser.sleep(1000);
        expect(deliveryPage.hasFailureTypeOption('Halt')).toBeTruthy();
        common.cancelModalButton.click();
      });

      it('REQ 2095: Ignore option should exist', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.openNewStepModalOnPhase(newPhaseTitleOne);
        expect(deliveryPage.hasFailureTypeOption('Ignore')).toBeTruthy();
        common.cancelModalButton.click();
      });

      it('REQ_2142: Should be able to drag steps to another phase', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addPhase(newPhaseTitleTwo);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.getPhaseStageOrStepByTitle(newStepTitleOne).then(function(step) {
          var dragStart = step.element(by.binding('item.title'));
          deliveryPage.getPhaseByTitle(newPhaseTitleTwo).then(function(phase) {
            var dragStop = phase.element(by.model('phase.items'));
            browser.actions().dragAndDrop(dragStart, dragStop).perform();
            expect(deliveryPage.phaseHasStep(newPhaseTitleTwo, newStepTitleOne)).toBeTruthy();
          });
        });
      });

      it('REQ 2245: Should be able reorder steps between stages', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStageOnPhase(newPhaseTitleOne, newStageTitleOne);
        deliveryPage.addStageOnPhase(newPhaseTitleOne, newStageTitleTwo);
        deliveryPage.addStepOnStage(newStageTitleTwo, newStepTitleOne);
        deliveryPage.getStepInStage(newStageTitleTwo, newStepTitleOne).then(function(step) {
          var dragStart = step.element(by.binding('item.title'));
          deliveryPage.getStageByTitle(newStageTitleOne).then(function(stage) {
            var dragStop = stage.element(by.model('item.items'));
            browser.actions().dragAndDrop(dragStart, dragStop).perform();
            expect(deliveryPage.stageHasStep(newStageTitleOne, newStepTitleOne)).toBeTruthy();
          });
        });
      });

    });

    /************************************************************************************
     *                                                                                  *
     *                                    ACTION                                        *
     *                                                                                  *
     ************************************************************************************/

    describe('Action: ', function() {

      it('REQ 3021: Should be able to add a cleanup action', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.addActionOnStep(newPhaseTitleOne, newActionOne.title, newActionOne.url);
        deliveryPage.openAction(newActionOne.title);
        deliveryPage.cleanupActionTab.waitReady();
        deliveryPage.cleanupActionTab.click();
        deliveryPage.cleanupURL.waitReady();
        deliveryPage.cleanupURL.sendKeys('URL');
        deliveryPage.saveAction_button.click();
        expect(deliveryPage.hasAction(newActionOne.title)).toBeTruthy();
        common.cancelModalButton.click();
      });

      //Can't test without setting up stackstorm in test environment
      xit('REQ 3023: Should not be able to delete a pipeline run that has a retain action', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.addActionOnStep(newPhaseTitleOne, newActionOne.title, newActionOne.url);
        deliveryPage.openAction(newActionOne.title);
        deliveryPage.actionType.waitReady();
        deliveryPage.actionType.click();
        deliveryPage.retainActionType.waitReady();
        deliveryPage.retainActionType.click();
        deliveryPage.saveAction_button.click();
        deliveryPage.save_button.waitReady();
        deliveryPage.save_button.click();
        deliveryPage.configureReturnToPipeline.waitReady();
        deliveryPage.configureReturnToPipeline.click();
        deliveryPage.runPipeline.waitReady();
        deliveryPage.runPipeline.click();
      });

      it('REQ 2011: Should be able to edit an action to delivery step', function() {
        var updatedTitle = newActionOne.title + '-updated';
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.addActionOnStep(newPhaseTitleOne, newActionOne.title, newActionOne.url);
        deliveryPage.openAction(newActionOne.title);
        deliveryPage.actionTitleBox.clear();
        deliveryPage.actionTitleBox.sendKeys(updatedTitle);
        deliveryPage.saveAction_button.click();
        expect(deliveryPage.hasAction(newActionOne.title)).toBeFalsy();
        expect(deliveryPage.hasAction(updatedTitle)).toBeTruthy();
        common.cancelModalButton.click();
      });

      it('REQ 2093: Should have an enable toggle', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.openNewActionModalOnStep(newStepTitleOne);
        expect(deliveryPage.enableActionCheckbox.isPresent()).toBeTruthy();
        deliveryPage.cancelActionButton.click();
        browser.sleep(1000);//wait for first modal to close and animation to finish.
        common.cancelModalButton.click();
      });

      it('REQ 2002: Should be able to reorder an action on the actions tab', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.addActionOnStep(newPhaseTitleOne, newActionOne.title, newActionOne.url);
        deliveryPage.save_button.waitReady();
        deliveryPage.save_button.click();
        deliveryPage.addActionOnStep(newPhaseTitleOne, newActionTwo.title, newActionTwo.url);
        var dragStart = deliveryPage.actions.first().element(by.css('.fa.fa-ellipsis-v'));
        var dragStop =  deliveryPage.actions.last().element(by.css('.fa.fa-ellipsis-v'));
        browser.actions().dragAndDrop(dragStart, dragStop).perform();
        expect(deliveryPage.actions.first().element(by.binding('action.title')).getText()).toBe(newActionTwo.title);
        common.cancelModalButton.click();
      });

      it('REQ 2934: Save Should be disabled if success criteria not yet saved', function() {
        deliveryPage.addPhase(newPhaseTitleOne);
        deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
        deliveryPage.openNewActionModalOnStep(newStepTitleOne);
        deliveryPage.successCriteria_tab.waitReady();
        deliveryPage.successCriteria_tab.click();
        browser.sleep(1000);//needed for some reason....
        deliveryPage.successParamLabelBox.waitReady();
        deliveryPage.successParamLabelBox.sendKeys('ONCE ENTERED NO SAVE');
        expect(element.all(by.buttonText('Save')).get(1).isEnabled()).toBeFalsy();
        deliveryPage.successParamParamBox.sendKeys('Param');
        deliveryPage.successParamValueBox.sendKeys('Param');
        browser.actions().mouseMove(deliveryPage.addSuccessParamButton).perform();
        deliveryPage.addSuccessParamButton.click();
        browser.sleep(500);//wait for success criteria to save
        expect(element.all(by.buttonText('Save')).get(1).isEnabled()).toBeTruthy();
        deliveryPage.cancelActionButton.waitReady();
        deliveryPage.cancelActionButton.click();
        common.cancelModalButton.waitReady();
        common.cancelModalButton.click();
      });

      describe('REQ 2096: Set pass or fail criteria on an action', function() {
        var paramName;
        var paramValue;
        var paramLabel;

        beforeEach(function() {
          paramName = 'testParam-' + Date.now();
          paramValue = 'testParamValue-' + Date.now();
          paramLabel = 'testParamLabel-' + Date.now();

          deliveryPage.addPhase(newPhaseTitleOne);
          deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
          deliveryPage.openNewActionModalOnStep(newStepTitleOne);
          deliveryPage.addSuccessCriteria(paramLabel, paramName, paramValue);
        });

        afterEach(function() {
          deliveryPage.cancelActionButton.waitReady();
          deliveryPage.cancelActionButton.click();
          common.cancelModalButton.waitReady();
          common.cancelModalButton.click();
        });

        it('Should be able to enter new Parameter for Success criteria', function() {
          expect(element(by.model('param.param')).isPresent()).toBeTruthy();
        });

        it('Should be able to enter new value for Success criteria', function() {
          expect(element(by.model('param.value')).isPresent()).toBeTruthy();
        });

      });

      describe('REQ 2172:The Success Criteria for an action should have a dropdown containing the options', function() {

        beforeEach(function() {
          deliveryPage.addPhase(newPhaseTitleOne);
          deliveryPage.addStepOnPhase(newPhaseTitleOne, newStepTitleOne);
          deliveryPage.openNewActionModalOnStep(newStepTitleOne);
          deliveryPage.successCriteria_tab.waitReady();
          deliveryPage.successCriteria_tab.click();
          element(by.model('$ctrl.new.operator')).waitReady();
        });

        afterEach(function() {
          deliveryPage.cancelActionButton.waitReady();
          deliveryPage.cancelActionButton.click();
          common.cancelModalButton.waitReady();
          common.cancelModalButton.click();
        });

        it('Should be able to see "Equals" in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Equals"]')))).toBeTruthy();
        });

        it('Should be able to see "Not Equals" in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Not Equals"]')))).toBeTruthy();
        });

        it('Should be able to see "Contains" in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Contains"]')))).toBeTruthy();
        });

        it('Should be able to see "Not Contains" in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Not Contains"]')))).toBeTruthy();
        });

        it('Should be able to see "Greater Than" in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Greater Than"]')))).toBeTruthy();
        });

        it('Should be able to see "Greater Than or Equal To" ' +
          'in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Greater Than or Equal To"]')))).toBeTruthy();
        });

        it('Should be able to see "Less Than" in the drop down option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Less Than"]')))).toBeTruthy();
        });

        it('Should be able to see "Less Than or Equal To" in the dropdown option list of success criteria', function() {
          expect(browser.isElementPresent(element(by.css('[label="Less Than or Equal To"]')))).toBeTruthy();
        });
      });

    });

    /************************************************************************************
     *                                                                                  *
     *                                     GATE                                         *
     *                                                                                  *
     ************************************************************************************/

  });

});
