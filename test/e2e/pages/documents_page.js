'use strict';
/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

require('../helpers/waitReady.js');

var DocumentsPage = function() {
  /** Cabinet **/
  this.cabinetEditBox = element(by.id('quick-add-cabinet')).element(by.model('documents.cabinetTitle'));
  this.addCabinetButton = element(by.id('quick-add-cabinet-submit'));
  this.emptyMessage = element(by.id('cabinet-empty-message'));
  this.search_Box = element(by.model('documents.filterValue'));
  this.cabinetListMenu = element(by.id('cabinet-list-menu'));
  this.cabinetListDelete = this.cabinetListMenu.element(by.css('.fa.fa-trash-o.text-muted'));
  this.deleteConfirmButton = element(by.buttonText('Delete'));
  this.selectAllCabinetCheckbox = element(by.model('documents.checkboxes.checked'));
  this.cabinets = element.all(by.repeater('cabinet in documents.cabinets'));
  this.cabinetName = element(by.binding('cabinet.title'));
  /** Documents **/
  this.activeTab = element.all(by.model('cabinet.activeTab'));
  this.noDocumentMessage = element(by.css('.text-muted.text-center'));
  this.backToCabinet = element(by.linkText('Documents'));
  this.cabinetTitle = element(by.binding('cabinet.cabinet.title | characters: 30'));
  this.addDocumentButton = element(by.buttonText('Add'));
  this.cabinetNameEditable = element(by.binding('cabinet.cabinet.title | characters: 30'));
  this.addDocumentTitle = element(by.model('documentModal.item.title'));
  this.addDocumentCategory = element(by.model('newTag.text'));
  this.adDocumentDescription = element(by.model('documentModal.item.description'));
  this.categoryExpand = element.all(by.css('.fa.expand'));
  this.categories = element.all(by.binding('folder.title | characters: 30'));
  this.documentTitles = element.all(by.binding('document.title'));
  this.documentsGroup = element.all(by.repeater('document in folder.documents track by document.id'));
  this.documentsList = element.all(by.repeater('document in cabinet.documents track by document.id'));
  this.editDescriptionLink = element(by.linkText('Description'));
  this.editDescriptionField = element(by.model('documentDetail.document.description'));
  this.documentDescriptionDetail = element(by.binding('documentDetail.document.description'));
  this.deleteDocumentButton = element(by.css('button[uib-tooltip="Delete"]'));
  this.editableDocTitle = element(by.binding('splitView.item.title | characters: 35'));
  this.documentOwner = element(by.binding('documentDetail.document.owner.firstname'));
  this.checkIn = element(by.buttonText('Check In'));
  this.checkOut = element(by.buttonText('Check Out'));
  this.versionTab = element(by.linkText('Versions'));
  this.uploadVersion = element(by.buttonText('Upload Version'));
  this.releasesInput = element.all(by.model('$select.search')).get(1);
  this.releaseResult = element(by.css('.option.ui-select-choices-row-inner'));
  this.releaseSelected = element(by.binding('$select.selected.title'));
  this.inputData = element(by.model('$data'));//used to clear editable fields.
  this.saveButton = element(by.buttonText('Save'));
  this.cancelButton = element(by.buttonText('Cancel'));

  this.deleteAllCabinets = function() {
    browser.sleep(1000);
    //this.selectAllCabinetCheckbox.waitReady(); doesn't work with waitReady for some reason, using sleep atm
    this.selectAllCabinetCheckbox.click();
    this.cabinetListMenu.click();
    this.cabinetListDelete.click();
    this.deleteConfirmButton.click();
  };

  this.deleteAllDocumentsList = function() {
    this.documentsList.then(function(items) {
      var i;
      for (i = 0; i < items.length; i++) {
        browser.actions().mouseMove(element.all(by.repeater('document in cabinet.documents track by document.id')).get(0)).perform();
        element.all(by.repeater('document in cabinet.documents track by document.id')).get(0).element(by.css('button[uib-tooltip="Delete"]')).click();
        element(by.buttonText('Delete')).waitReady();
        element(by.buttonText('Delete')).click();
        browser.sleep(1000);//wait for delete to finish
      }
    });
  };

  this.deleteAllDocumentsGroup = function() {
    this.documentsGroup.then(function(items) {
      var i;
      for (i = 0; i < items.length; i++) {
        browser.actions().mouseMove(element.all(by.repeater('document in folder.documents track by document.id')).get(0)).perform();
        element.all(by.repeater('document in folder.documents track by document.id')).get(0).element(by.css('button[uib-tooltip="Delete"]')).click();
        browser.sleep(1000);//wait for delete to finish
      }
    });
  };

  this.addDocumentTitleOnly = function(title) {
    this.addDocumentButton.waitReady();
    this.addDocumentButton.click();
    this.addDocumentTitle.waitReady();
    this.addDocumentTitle.sendKeys(title);
    this.saveButton.click();
  };

  this.addDocument = function(title, category, description) {
    this.addDocumentButton.waitReady();
    this.addDocumentButton.click();
    this.addDocumentTitle.waitReady();
    this.addDocumentTitle.sendKeys(title);
    this.addDocumentCategory.click();
    browser.actions().sendKeys(category, protractor.Key.ENTER).perform();
    this.adDocumentDescription.sendKeys(description);
    this.saveButton.click();
  };

};

module.exports = DocumentsPage;

