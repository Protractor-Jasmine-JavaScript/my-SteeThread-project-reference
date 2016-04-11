/**
 */
/* global describe, beforeEach, afterEach, it, browser, expect, element, by, protractor*/
'use strict';

require('../helpers/waitReady.js');

var ReleasePage = function() {

  this.addReleaseButton = element(by.buttonText('Add'));
  this.selectAllReleases = element(by.model('releases.checkboxes.checked'));
  this.selectFirstRelease = element.all(by.model('releases.checkboxes.items[story.id]')).get(0);
  this.releaseTitle = element.all(by.binding('story.title'));
  this.deleteButton = element(by.css('.btn.btn-link'));
  this.deleteConfirm = element(by.buttonText('Delete'));
  this.noReleaseMessage = element(by.css('.well.st-well.text-muted'));
  this.alreadyExistsMessage = element(by.binding('releaseModal.errorMsgs.title'));
  /**** Release Modal ****/
  this.releaseTitleBox = element(by.model('releaseModal.item.title'));
  this.releaseDescriptionBox = element(by.model('releaseModal.item.description'));
  this.releaseDate = element(by.css('.sts-date-range-picker'));
  this.releaseTechLead = element(by.css('input[placeholder="Tech Lead (Required)"]'));
  this.releaseTechLeadSelected = element(by.binding('releaseModal.techLead.firstname'));
  this.releaseTechLeadDropdown = element.all(by.css('.tt-dropdown-menu')).get(3);
  this.releaseProjectManager = element(by.css('input[placeholder="Project Manager (Required)"]'));
  this.releaseProjectManagerSelected = element(by.binding('releaseModal.projectManager.firstname'));
  this.releaseProjectManagerDropdown = element.all(by.css('.tt-dropdown-menu')).get(3);
  this.releaseAISName = element(by.model('releaseModal.item.customFields.aisName'));
  this.saveButton = element(by.buttonText('Save'));
  this.cancelButton = element(by.buttonText('Cancel'));
  /**** Split View Details ****/
  this.description = element(by.css('div[ng-if="releaseDetail.item.description"]'));
  this.descriptionEdit = element(by.model('releaseDetail.item.description'));
  this.dateRange = element(by.binding('releaseDetail.item.customFields.startDate'));
  this.clearDateStart = element.all(by.css('.clear')).get(0);
  this.clearDateEnd = element.all(by.css('.clear')).get(3);
  this.techLead = element(by.binding('releaseDetail.techLead.firstname'));
  this.techLeadBox = element(by.css('input[placeholder="Team Tech Lead"]'));
  this.techLeadDropdown = element.all(by.css('.tt-dropdown-menu')).get(0);
  this.clearTechLead = element.all(by.css('.fa.fa-times')).get(0);
  this.projectManager = element(by.binding('releaseDetail.projectManager.firstname'));
  this.projectManagerBox = element(by.css('input[placeholder="Project Manager"]'));
  this.projectManagerDropdown = element.all(by.css('.tt-dropdown-menu')).get(0);
  this.clearProjectManager = element.all(by.css('.fa.fa-times')).get(1);
  this.AISName = element(by.model('releaseDetail.item.customFields.aisName'));
  /**** Components ****/
  this.components = element.all(by.repeater('component in components.items track by component.id'));
  this.componentTab = element(by.linkText('Components'));
  this.addComponentButton = element(by.css('.fa.fa-plus.st-controls'));
  this.componentTitleBox = element(by.model('componentModal.item.title'));
  this.componenetVersionBox = element(by.model('componentModal.item.version'));
  this.componenetSourceURLBox = element(by.model('componentModal.item.sourceUrl'));
  this.componentDestinationURLBox = element(by.model('componentModal.item.destinationUrl'));
  this.componenetGroupIDBox = element(by.model('componentModal.item.groupId'));
  this.componentArtifactIDBox = element(by.model('componentModal.item.artifactId'));
  this.componentTitle = element(by.binding('component.title'));
  this.componentVersion = element(by.binding('component.version'));
  this.componentSourceURL = element(by.binding('component.sourceUrl'));
  this.componentDestinationURL = element(by.binding('component.destinationUrl'));
  this.componentGroupID = element(by.binding('component.groupId'));
  this.componentArtifactID = element(by.binding('component.artifactId'));
  this.deleteComponent = element(by.css('button[uib-tooltip="Delete"]'));
  /**** Release Detail Testing tab ****/
  this.releaseDetailTestingTab = element(by.css('a[ui-sref=".testing"]'));
  this.addTestCaseButton = element(by.css('button[ng-click="testing.openTestingModal()"]'));
  this.downloadTestPlanLink = element(by.linkText('Download Test Plan'));
  this.selectFirstTestCase = element.all(by.model('testCases.checkboxes.items[testCase.id]')).get(0);
  this.selectAllTestCases = element(by.model('testCases.checkboxes.checked'));
  /**** Grid ****/
  this.testCaseGridIsEmpty = element(by.css('.fa.fa-ban'));
  this.firstTestCaseRow = element.all(by.repeater('item in testing.items track by item.id')).first();
  this.testCaseNameColumn = element.all(by.binding('item.name')).get(0);
  this.testCaseDescriptionColumn = element.all(by.binding('testCase.description')).get(0);
  this.testCaseCountColumn = element(by.css('ng-pluralize[count="item.testSteps.length"]'));
  this.testCasePassColumn = this.firstTestCaseRow.element(by.css('i.fa.fa-2x.fa-check.text-success'));
  this.testCaseFailColumn = this.firstTestCaseRow.element(by.css('i.fa.fa-2x.fa-times.text-danger'));
  this.testCaseDeferColumn = this.firstTestCaseRow.element(by.css('i.fa.fa-2x.fa-minus.text-warning'));
  /**** Case Modal ****/
  this.testModalName = element(by.model('testCaseModal.item.name'));
  this.testModalAddStep = element(by.css('button[ng-click="testCaseModal.openStepModal()"]'));
  this.testModalSave = element(by.css('button[ng-click="testCaseModal.save()"]'));
  this.testCaseTab = element.all(by.model('testCaseModal.tab')).get(0);
  this.testCaseFirstStep = element.all(by.repeater('testStep in testCaseModal.testSteps track by testStep.id')).get(0);
  this.testCaseAction = element(by.binding('testStep.action'));
  this.testCaseExpectedResult = element(by.binding('testStep.expectedResult'));
  this.testCaseObservedResult = element(by.binding('testStep.observedResult'));
  this.testCaseStepPass = this.testCaseFirstStep.element(by.css('i.fa.fa-2x.fa-check.text-success'));
  this.testCaseStepFail = this.testCaseFirstStep.element(by.css('i.fa.fa-2x.fa-times.text-danger'));
  this.testCaseStepDefer = this.testCaseFirstStep.element(by.css('i.fa.fa-2x.fa-minus.text-warning'));
  /**** Step Modal ****/
  this.testStepTab = element.all(by.model('testCaseModal.tab')).get(1);
  this.testStepModalAction = element(by.model('testStepModal.item.action'));
  this.testStepModalExpected = element(by.model('testStepModal.item.expectedResult'));
  this.testStepModalObserved = element(by.model('testStepModal.item.observedResult'));
  this.testStepModalStatusDropdown = element(by.model('$select.search'));
  this.testStepModalSave = element(by.css('button[ng-click="testStepModal.save()"]'));

  this.deleteAllReleases = function() {
    this.selectAllReleases.click();
    this.deleteButton.click();
    this.deleteConfirm.waitReady();
    this.deleteConfirm.click();
  };

  this.deleteFirstRelease = function() {
    this.selectFirstRelease.click();
    this.deleteButton.click();
    this.deleteConfirm.waitReady();
    this.deleteConfirm.click();
  };

  this.editReleaseTitle = function(oldTitle, updated) {
    element(by.cssContainingText('td.ng-binding', oldTitle)).waitReady();
    element(by.cssContainingText('td.ng-binding', oldTitle)).click();
    element(by.binding('splitView.item.title | characters: 35 ')).waitReady();
    element(by.binding('splitView.item.title | characters: 35 ')).click();
    browser.sleep(1000);
    browser.actions().sendKeys(updated, protractor.Key.ENTER).perform();
  };

  this.addDate = function() {
    this.releaseDate.click();
    element.all(by.cssContainingText('.day', '1')).get(0).click();
    element.all(by.cssContainingText('.day', '1')).get(17).click();
    element(by.css('.close')).click();
    browser.sleep(1000);//wait for popover to completely close.
  };

  this.addDateSplitView = function() {
    this.dateRange.click();
    element.all(by.cssContainingText('.day', '1')).get(0).click();
    element.all(by.cssContainingText('.day', '1')).get(17).click();
    this.dateRange.click();
  };

  this.addRelease = function(title) {
    this.addReleaseButton.waitReady();
    this.addReleaseButton.click();
    this.releaseTitleBox.waitReady();
    this.releaseTitleBox.sendKeys(title);
    this.releaseDescriptionBox.sendKeys('My Description');
    this.addDate();
    this.releaseTechLead.waitReady();
    this.releaseTechLead.click();
    this.releaseTechLead.sendKeys('Org Admin');
    this.releaseTechLeadDropdown.click();
    this.releaseProjectManager.click();
    this.releaseProjectManager.sendKeys('Org Admin');
    this.releaseProjectManagerDropdown.click();
    this.releaseAISName.sendKeys('Name');
    this.saveButton.click();
  };

  this.clickOnRelease = function(newReleaseName) {
    element(by.cssContainingText('td.ng-binding', newReleaseName)).click();
  };

  this.addTestCase = function(name) {
    this.addTestCaseButton.click();
    this.testModalName.waitReady();
    this.testModalName.sendKeys(name);
    this.testModalSave.click();
    this.downloadTestPlanLink.waitReady();
  };

  this.addTestStep = function(status) {
    this.firstTestCaseRow.click();
    this.testStepTab.waitReady();
    this.testStepTab.click();
    browser.actions().mouseMove(this.testCaseTab).perform();
    this.testModalAddStep.waitReady();
    this.testModalAddStep.click();
    this.testStepModalAction.waitReady();
    this.testStepModalAction.sendKeys('step 1');
    this.testStepModalExpected.sendKeys('expected 1');
    this.testStepModalObserved.sendKeys('observed 1');
    this.testStepModalStatusDropdown.click();
    if (status === 'Passed') {
      element(by.cssContainingText('div[ng-bind-html="option"]', 'Passed')).waitReady();
      element(by.cssContainingText('div[ng-bind-html="option"]', 'Passed')).click();
    } else if (status === 'Failed') {
      element(by.cssContainingText('div[ng-bind-html="option"]', 'Failed')).waitReady();
      element(by.cssContainingText('div[ng-bind-html="option"]', 'Failed')).click();
    } else if (status === 'Deferred') {
      element(by.cssContainingText('div[ng-bind-html="option"]', 'Deferred')).waitReady();
      element(by.cssContainingText('div[ng-bind-html="option"]', 'Deferred')).click();
    }
    this.testStepModalSave.click();
    this.testModalSave.waitReady();
  };

  this.editTestCase = function(editedName) {
    this.firstTestCaseRow.click();
    this.testModalName.waitReady();
    this.testModalName.sendKeys(editedName);
    this.testModalSave.click();
    this.downloadTestPlanLink.waitReady();
  };
};

module.exports = ReleasePage;
