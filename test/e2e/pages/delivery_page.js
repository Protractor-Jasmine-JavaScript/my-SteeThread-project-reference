'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var CommonPage = require('./common_item_page');
var common = new CommonPage();
require('../helpers/waitReady.js');

var DeliveryPage = function() {
  var that = this;

  /***** Add Pipeline Page *****/
  this.pipelines = element.all(by.repeater('pipeline in delivery.pipelines'));
  this.pipelineTitleBox = element(by.name('pipelineForm')).element(by.model('pipelineModal.pipeline.title'));
  this.pipelineRelease = element.all(by.model('newTag.text')).get(0);
  this.pipelineReleaseDropdown = element.all(by.model('$select.search')).get(0);
  this.pipelineReleaseResultSlugID = element(by.binding('release.slugId'));
  this.pipelineReleaseDescriptionHover = element(by.css('.tooltip'));
  this.componentReleaseDropdown = element.all(by.model('$select.search')).get(1);
  this.globalVarParamBox = element(by.model('pipelineModal.newVariable.param'));
  this.globalVarValueBox = element(by.model('pipelineModal.newVariable.value'));
  this.globalVarMaskCheckbox = element(by.model('pipelineModal.newVariable.isMasked'));
  this.globalVars = element.all(by.repeater('variable in pipelineModal.pipeline.variables'));
  this.addGlobalVar = element(by.css('button[ng-click="pipelineModal.addVariable()"]'));
  this.upstreamPipelineBox = element(by.model('newTag.text'));
  this.upstreamPipelineDropdown = element(by.binding('data.title'));
  this.upstreamPipeline = element.all(by.binding('pipeline.title')).get(2);
  this.downstreamPipeline = element.all(by.binding('pipeline.title')).get(2);//yes they are the same, avoids confusion
  this.enablePipeline = element(by.buttonText('Enable Pipeline'));
  this.disablePipeline = element(by.buttonText('Disable Pipeline'));
  this.runPipeline = element(by.buttonText('Run Pipeline'));
  this.pipelineTitle = element.all(by.binding('pipeline.title')).get(1);
  this.configureReturnToPipeline = element(by.linkText('Return to Pipeline'));
  this.pipelineReturnToDelivery = element(by.linkText('Return to Delivery'));
  this.configurePipelineButton = element(by.linkText('Configure Pipeline'));
  this.editPipelineButton = element(by.buttonText('Edit Pipeline'));
  /***** Phase/Action/Step *****/
  this.containerTitleBox = element(by.model('containerModal.container.title'));
  this.stepTitleBox = element(by.model('stepModal.step.title'));
  this.stepFailureType = element(by.model('stepModal.step.onFailureType'));
  this.stepFailureTypeOptions =
    element.all(by.options('type.value as type.text for type in stepModal.onFailureTypeOptions'));
  this.actionTitleBox = element(by.model('actionModal.action.title'));
  this.actionUrlParamBox = element(by.model('item.url'));
  this.addPhaseButton = element(by.buttonText('Add Phase'));
  this.phases = element.all(by.repeater('phase in pipelineConfigure.phases'));
  this.actions = element.all(by.repeater('action in stepModal.actions'));
  this.deleteConfirm_button = element(by.css('.btn.btn-danger.ng-binding'));
  this.enterDescription_editBox = element(by.model('stepModal.step.description'));
  this.phase = element(by.css('[uib-tooltip=\'Phase Options\']'));
  this.selectedColor = element(by.css('[style=\'background-color: #7ed6c1\']'));
  /** ACTION **/
  this.enableActionCheckbox = element(by.model('actionModal.action.enabled'));
  this.showSuccessCriteriaText = element(by.css('.modal-more-toggle.ng-scope'));
  this.successCriteria_tab = element(by.css('[uib-tooltip=\'Success Criteria\']'));
  this.addSuccessParamButton = element(by.css('[ng-click=\'$ctrl.add()\']'));
  this.successParamParamBox = element(by.model('$ctrl.new.param'));
  this.successParamValueBox = element(by.model('$ctrl.new.value'));
  this.successParamLabelBox = element(by.model('$ctrl.new.label'));
  this.actionType = element(by.model('actionModal.action.type'));
  this.retainActionType = element(by.css('option[label="Retain Pipeline Run"]'));
  this.phaseOptions = element(by.css('[uib-tooltip=\'Phase Options\']'));
  this.addActionButton = element(by.css('[uib-tooltip=\'Add Action\']'));
  this.stepDetailButton = element(by.css('[uib-tooltip=\'Details\']'));
  this.stepActionButton = element(by.css('[uib-tooltip=\'Actions\']'));
  this.cleanupActionTab = element(by.css('button[uib-tooltip="Cleanup"]'));
  this.cleanupURL = element(by.model('item.url'));
  this.saveAction_button = element(by.css('[ng-click=\'actionModal.save()\']'));
  this.cancelActionButton = element.all(by.css('[ng-click=\'actionModal.cancel()\']')).get(0);
  this.save_button = element(by.buttonText('Save'));
  this.cancelButton = element(by.buttonText('Cancel'));
  this.deleteButton = element(by.buttonText('Delete'));

  this.addPhase = function(newPhaseTitle) {
    this.addPhaseButton.waitReady('withRefresh');
    this.addPhaseButton.click();
    this.containerTitleBox.waitReady();
    this.containerTitleBox.sendKeys(newPhaseTitle);
    common.saveModalButton.click();
  };

  this.addSuccessCriteria = function(param_label, param_name, param_value) {
    this.successCriteria_tab.waitReady();
    this.successCriteria_tab.click();
    browser.sleep(1000);
    this.successParamLabelBox.waitReady();
    this.successParamLabelBox.sendKeys(param_label);
    this.successParamParamBox.sendKeys(param_name);
    this.successParamValueBox.sendKeys(param_value);
    browser.actions().mouseMove(this.addSuccessParamButton).perform();
    browser.sleep(500);
    this.addSuccessParamButton.click();
    browser.sleep(500);
  };

  this.addStepOnPhase = function(phaseName, stepTitle) {
    this.getPhaseByTitle(phaseName).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Phase Options\']')).click();
      phase.element(by.css('[ng-click=\'pipelineConfigure.openStepModal(null, phase.id)\']')).click();
      that.addStepTitle(stepTitle);
    });
  };

  this.addStepTitle = function(stepTitle) {
    this.stepTitleBox.waitReady();
    this.stepTitleBox.clear();
    this.stepTitleBox.sendKeys(stepTitle);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  };

  this.addStepOnStage = function(stageTitle, stepTitle) {
    this.getStageByTitle(stageTitle).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Stage Options\']')).click();
      phase.element(by.css('[ng-click=\'pipelineConfigure.openStepModal(null, item.id)\']')).click();
      that.addStepTitle(stepTitle);
    });
  };

  this.addStageOnPhase = function(phaseName, stageTitle) {
    this.getPhaseByTitle(phaseName).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Phase Options\']')).click();
      phase.element(by.css('[ng-click=\'pipelineConfigure.openContainerModal(null, phase.id)\']')).click();
      that.addStageTitle(stageTitle);
    });
  };

  this.addStageTitle = function(stageTitle) {
    this.containerTitleBox.waitReady();
    this.containerTitleBox.sendKeys(stageTitle);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  };

  this.addActionOnStep = function(title, action_name, action_url) {
    this.getPhaseByTitle(title).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Actions\']')).click();
      that.addActionButton.waitReady();
      that.addActionButton.click();
      that.actionTitleBox.waitReady();
      that.actionTitleBox.sendKeys(action_name);
      that.actionUrlParamBox.sendKeys(action_url);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
  };

  this.getAction = function(title) {
    return this.actions.filter(function(elem) {
      return elem.evaluate('action.title').then(function(text) {
        return text === title;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0] : null;
    });
  };

  this.getPhaseByColumnNumber = function(number) {
    return element.all(by.binding('phase.title')).get(number);
  };

  this.getPhaseByTitle = function(title) {
    return element.all(by.repeater('phase in pipelineConfigure.phases')).filter(function(elem) {
      return elem.evaluate('phase.title').then(function(text) {
        return text === title;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0] : null;
    });
  };

  this.getPhaseStageOrStepByTitle = function(title) {
    return element.all(by.repeater('item in phase.items')).filter(function(elem) {
      return elem.element(by.binding('item.title')).getText().then(function(text) {
        return text === title;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0] : null;
    });
  };

  this.getStepInPhase = function(phaseTitle, stepTitle) {
    return this.getPhaseByTitle(phaseTitle).then(function(phase) {
      if (!phase) {
        return null;
      }
      return phase.all(by.repeater('item in phase.items')).filter(function(elem) {
        return elem.element(by.binding('item.title')).getText().then(function(text) {
          return text === stepTitle;
        });
      }).then(function(filtered) {
        return (filtered.length > 0) ? filtered[0] : null;
      });
    });
  };

  this.getStepInStage = function(stageTitle, stepTitle) {
    return this.getStageByTitle(stageTitle).then(function(stage) {
      if (!stage) {
        return null;
      }
      return stage.all(by.repeater('innerItem in item.items')).filter(function(elem) {
        return elem.element(by.binding('item.title')).getText().then(function(text) {
          return text === stepTitle;
        });
      }).then(function(filtered) {
        return (filtered.length > 0) ? filtered[0] : null;
      });
    });
  };

  this.getStageByTitle = function(title) {
    return element.all(by.repeater('item in phase.items')).filter(function(elem) {
      return elem.evaluate('item.title').then(function(text) {
        return text === title;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0] : null;
    });
  };

  this.getPipelineByTitle = function(title) {
    return this.pipelines.filter(function(elem) {
      return elem.evaluate('pipeline.title').then(function(text) {
        return text === title;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0] : null;
    });
  };

  this.hasFailureTypeOption = function(failureType) {
    this.stepFailureTypeOptions.get(0).waitReady();
    return this.stepFailureTypeOptions.filter(function(elem) {
      return elem.getText().then(function(text) {
        return text === failureType;
      });
    }).then(function(filtered) {
      return (filtered.length > 0);
    });
  };

  this.clickPhase = function() {
    this.phase.click();
  };

  this.updateStepOnPhase = function(phaseName, update_stepTitle) {
    this.getPhaseByTitle(phaseName).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Details\']')).click();
      that.addStepTitle(update_stepTitle);
      //browser.sleep(3000);
      //that.stepTitleBox.clear();
      //that.stepTitleBox.sendKeys(update_stepTitle);
      //browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
  };

  this.openAction = function(title) {
    this.getAction(title).then(function(action) {
      action.element(by.binding('action.title')).click();
    });
  };

  this.openNewActionModalOnStep = function(stepTitle) {
    this.getPhaseStageOrStepByTitle(stepTitle).then(function(step) {
      step.element(by.css('[uib-tooltip=\'Actions\']')).waitReady();
      step.element(by.css('[uib-tooltip=\'Actions\']')).click();
      that.addActionButton.waitReady();
      that.addActionButton.click();
    });
  };

  this.openNewStepModalOnPhase = function(phaseName) {
    this.getPhaseByTitle(phaseName).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Phase Options\']')).click();
      phase.element(by.css('[ng-click=\'pipelineConfigure.openStepModal(null, phase.id)\']')).click();
    });
  };

  this.openStepInPhase = function(phaseTitle, stepTitle) {
    this.getStepInPhase(phaseTitle, stepTitle).then(function(step) {
      step.element(by.css('[uib-tooltip=\'Details\']')).click();
    });
  };

  this.configurePipeline = function(title) {
    this.getPipelineByTitle(title).then(function(pipeline) {
      pipeline.element(by.css('a.caption-subject.font-blue-hoki')).click();
      element(by.linkText('Configure Pipeline')).click();
      //if (pipeline) {
      //  pipeline.element(by.css('a[uib-tooltip="Configure Pipeline"]')).click();
      //}
    });
  };

  this.editPhase = function(old_title) {
    this.getPhaseByTitle(old_title).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Phase Options\']')).click();
      phase.element(by.css('.fa.fa-edit.text-muted')).click();
    });
  };

  this.hasAction = function(title) {
    return this.getAction(title).then(function(action) {
      return action !== null;
    });
  };

  this.phaseHasStep = function(phaseTitle, stepTitle) {
    return this.getStepInPhase(phaseTitle, stepTitle).then(function(step) {
      return step !== null;
    });
  };

  this.phaseHasStage = function(phaseTitle, stepTitle) {
    return this.getStepInPhase(phaseTitle, stepTitle).then(function(stage) {
      return stage !== null;
    });
  };

  this.stageHasStep = function(stageTitle, stepTitle) {
    return this.getStepInStage(stageTitle, stepTitle).then(function(step) {
      return step !== null;
    });
  };

  this.deletePipeline = function() {
    this.configureReturnToPipeline.waitReady();
    this.configureReturnToPipeline.click();
    element(by.buttonText('Delete Pipeline')).waitReady();
    element(by.buttonText('Delete Pipeline')).click();
    this.deleteButton.waitReady();
    this.deleteButton.click();
  };

  //Called from delivery landing page, specifying a pipeline title to indicate which pipeline to delete
  this.deleteSpecificPipeline = function(pipelineTitle) {
    element(by.cssContainingText('a.caption-subject.font-blue-hoki', pipelineTitle)).waitReady('withRefresh');
    element(by.cssContainingText('a.caption-subject.font-blue-hoki', pipelineTitle)).click();
    element(by.buttonText('Delete Pipeline')).waitReady();
    element(by.buttonText('Delete Pipeline')).click();
    this.deleteButton.waitReady();
    this.deleteButton.click();
  };

  this.deleteByPhase = function(title) {
    this.getPhaseByTitle(title).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Phase Options\']')).click();
      browser.sleep(500);
      phase.element(by.css('.fa.fa-trash-o.text-muted')).click();
      browser.sleep(500);
      common.deleteButton.click();
    });
  };

  this.deleteByStage = function(stageTitle) {
    this.getStageByTitle(stageTitle).then(function(phase) {
      phase.element(by.css('[uib-tooltip=\'Stage Options\']')).click();
      browser.sleep(500);
      phase.element(by.css('.fa.fa-trash-o.text-muted')).click();
      browser.sleep(500);
      common.deleteButton.click();
    });
  };

  this.deleteStepInPhase = function(title) {
    return this.getPhaseStageOrStepByTitle(title).then(function(step) {
      browser.actions().mouseMove(step).perform();
      step.element(by.css('[uib-tooltip=\'Delete\']')).click();
      common.deleteButton.waitReady();
      common.deleteButton.click();
    });
  };

  this.deleteStepByStageTitle = function(title) {
    this.getStageByTitle(title).then(function(phase) {
      browser.actions().mouseMove(phase.element(by.css('[uib-tooltip=\'Actions\']'))).perform();
      browser.actions().mouseMove(phase.element(by.css('[uib-tooltip=\'Delete\']'))).perform();
      browser.actions().click().perform();
      common.deleteButton.click();
    });
  };

  this.addAndConfigurePipeline = function(title) {
    common.addButton.click();
    this.pipelineReleaseDropdown.waitReady();
    this.pipelineReleaseDropdown.click();
    element(by.css('.option.ui-select-choices-row-inner')).waitReady();
    element(by.css('.option.ui-select-choices-row-inner')).click();
    this.pipelineTitleBox.clear();
    this.pipelineTitleBox.sendKeys(title);
    this.save_button.click();
    element(by.cssContainingText('a.caption-subject.font-blue-hoki', title)).waitReady('withRefresh');
    this.configurePipeline(title);
  };

  this.addPipeline = function(title) {
    common.addButton.click();
    this.pipelineReleaseDropdown.waitReady();
    this.pipelineReleaseDropdown.click();
    element.all(by.css('.option.ui-select-choices-row-inner')).get(0).waitReady();
    element.all(by.css('.option.ui-select-choices-row-inner')).get(0).click();
    this.pipelineTitleBox.clear();
    this.pipelineTitleBox.sendKeys(title);
    this.save_button.click();
    element(by.cssContainingText('a.caption-subject.font-blue-hoki', title)).waitReady('withRefresh');
  };

  this.editPipelineTitle = function(newTitle) {
    this.editPipelineButton.waitReady();
    this.editPipelineButton.click();
    this.pipelineTitleBox.waitReady();
    this.pipelineTitleBox.clear();
    this.pipelineTitleBox.sendKeys(newTitle);
    this.save_button.click();
  };
};

module.exports = DeliveryPage;
