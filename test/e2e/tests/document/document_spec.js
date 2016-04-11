/**
 */

'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var username = browser.params.users.orgAdmin.username;
var password = browser.params.users.orgAdmin.password;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;
var release = browser.params.release.release_name;

var DocumentsPage = require('./../../pages/documents_page.js');
var MenuPage = require('./../../pages/menuItem_page');
var helper = require('../../helpers/helper.js');
require('../../helpers/waitReady.js');

/************************************************************************************
 *                                                                                  *
 *                                  DOCUMENTS                                       *
 *                                                                                  *
 ************************************************************************************/

describe('Document Cabinet', function() {
  var documentsPage;
  var menuPage;
  var cabinetName;
  var docTitle;
  var docCategory;
  var docDescription;

  beforeEach(function() {
    documentsPage = new DocumentsPage();
    menuPage = new MenuPage();
    cabinetName = 'testCabinet-' + Date.now();
    docTitle = 'docTitle-' + Date.now();
    docCategory = 'Category1';
    docDescription = 'docDescription-' + Date.now();
    helper.login(username, password);
    helper.getUrl(org_url + workspace);
    menuPage.documents_menuItem.waitReady('withRefresh');
    menuPage.documents_menuItem.click();
    documentsPage.cabinetEditBox.sendKeys(cabinetName);
    documentsPage.addCabinetButton.click();
    documentsPage.cabinetName.waitReady();
  });

  afterEach(function() {
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                             DOCUMENT CABINET VIEW                                *
   *                                                                                  *
   ************************************************************************************/

  describe('Document Cabinet View: ', function() {

    it('REQ 1531: Document cabinet should be able to be added/deleted', function() {
      expect(documentsPage.cabinetName.getText()).toBe(cabinetName);
      documentsPage.deleteAllCabinets();
      expect(documentsPage.emptyMessage.getText()).toBe('No Cabinets Found');
    });

    it('Should be able to click on the title of the cabinet to see the contained documents', function() {
      documentsPage.cabinetName.click();
      expect(browser.isElementPresent(documentsPage.cabinetNameEditable)).toBeTruthy();
      documentsPage.backToCabinet.click();
      documentsPage.deleteAllCabinets();
    });
  });

  /************************************************************************************
   *                                                                                  *
   *                             DOCUMENT LIST VIEW                                   *
   *                                                                                  *
   ************************************************************************************/

  describe('Documents List View: ', function() {

    beforeEach(function() {
      documentsPage.cabinetName.click();
    });

    afterEach(function() {
      documentsPage.backToCabinet.waitReady();
      documentsPage.backToCabinet.click();
      documentsPage.deleteAllCabinets();
    });

    it('Should be able to add and view a document in the list view', function() {
      documentsPage.addDocumentTitleOnly(docTitle);
      documentsPage.documentsList.get(0).waitReady();
      expect(documentsPage.documentTitles.get(0).getText()).toBe(docTitle);
    });

    it('Should be able to delete a document in the list view', function() {
      documentsPage.addDocumentTitleOnly(docTitle);
      documentsPage.documentsList.get(0).waitReady();
      documentsPage.deleteAllDocumentsList();
      documentsPage.noDocumentMessage.waitReady();
      expect(browser.isElementPresent(documentsPage.noDocumentMessage)).toBeTruthy();
    });

  });

  /************************************************************************************
   *                                                                                  *
   *                            DOCUMENT GROUPED VIEW                                 *
   *                                                                                  *
   ************************************************************************************/

  describe('Documents Grouped View: ', function() {

    beforeEach(function() {
      documentsPage.cabinetName.click();
      documentsPage.activeTab.get(0).click();
    });

    afterEach(function() {
      documentsPage.backToCabinet.waitReady();
      documentsPage.backToCabinet.click();
      documentsPage.deleteAllCabinets();
    });

    it('REQ 2825: Should be able to add a document with just a title', function() {
      documentsPage.addDocumentTitleOnly(docTitle);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentsGroup.get(0).waitReady();
      expect(browser.isElementPresent(documentsPage.documentsGroup.get(0))).toBeTruthy();
      expect(documentsPage.documentTitles.get(0).getText()).toBe(docTitle);
    });

    it('REQ 2825: Should add documents with no category to the uncategorized category', function() {
      documentsPage.addDocumentTitleOnly(docTitle);
      documentsPage.categories.get(0).waitReady();
      expect(browser.isElementPresent(documentsPage.categories.get(0))).toBeTruthy();
      documentsPage.categoryExpand.click();
      documentsPage.documentsGroup.get(0).waitReady();
      expect(browser.isElementPresent(documentsPage.documentsGroup.get(0))).toBeTruthy();
      expect(documentsPage.documentTitles.get(0).getText()).toBe(docTitle);
    });

    it('REQ 2825: Should be able to delete a document', function() {
      documentsPage.addDocumentTitleOnly(docTitle);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentsGroup.get(0).waitReady();
      documentsPage.deleteAllDocumentsGroup();
      expect(browser.isElementPresent(documentsPage.noDocumentMessage)).toBeTruthy();
    });

    it('REQ 2825: Should be able to edit a document title', function() {
      documentsPage.addDocumentTitleOnly(docTitle);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.editableDocTitle.waitReady();
      documentsPage.editableDocTitle.click();
      documentsPage.inputData.clear();//
      browser.actions().sendKeys('EDITED TITLE', protractor.Key.ENTER).perform();
      browser.sleep(1000);//wait for save to process, waitReady doesn't help here
      expect(documentsPage.documentTitles.get(0).getText()).toBe('EDITED TITLE');
    });

    it('REQ 2854: Should be able to add a document to a category/folder', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      expect(documentsPage.categories.get(0).getText()).toBe(docCategory);
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      expect(documentsPage.documentTitles.get(0).getText()).toBe(docTitle);
    });

    it('REQ 2854: Should be able to edit/add a document to multiple categories in the split view', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      expect(documentsPage.categories.get(0).getText()).toBe(docCategory);
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.addDocumentCategory.waitReady();
      documentsPage.addDocumentCategory.click();
      browser.actions().sendKeys('newCategory', protractor.Key.ENTER).perform();
      browser.sleep(1000);//wait for new category to save
      expect(documentsPage.categories.get(1).getText()).toBe('newCategory');
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(1).waitReady();
      expect(documentsPage.documentTitles.get(1).getText()).toBe(docTitle);
    });

    it('REQ 3040: Should set the document creator to the document owner on add', function() {
      documentsPage.addDocument(docTitle, '', docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.editDescriptionLink.waitReady();
      expect(documentsPage.documentOwner.getText()).toBe('Org Admin');
    });

    it('REQ 3042: Should be able to add a document with a description', function() {
      documentsPage.addDocument(docTitle, '', docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.editDescriptionLink.waitReady();
      expect(documentsPage.documentDescriptionDetail.getText()).toBe(docDescription);
    });

    it('REQ 3041: Should be able to edit a document description', function() {
      documentsPage.addDocument(docTitle, '', docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.editDescriptionLink.waitReady();
      documentsPage.editDescriptionLink.click();
      documentsPage.editDescriptionField.waitReady();
      documentsPage.editDescriptionField.click();
      documentsPage.editDescriptionField.clear();
      documentsPage.editDescriptionField.sendKeys('EDITED DESCRIPTION');
      documentsPage.checkOut.click();
      expect(documentsPage.documentDescriptionDetail.getText()).toBe('EDITED DESCRIPTION');
    });

    it('REQ 2854: Should be able to edit a category in the grouped view', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      expect(documentsPage.categories.get(0).getText()).toBe(docCategory);
      documentsPage.categories.get(0).click();
      documentsPage.inputData.clear();//
      browser.actions().sendKeys('EDITED CATEGORY', protractor.Key.ENTER).perform();
      expect(documentsPage.categories.get(0).getText()).toBe('EDITED CATEGORY');
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      expect(documentsPage.documentTitles.get(0).getText()).toBe(docTitle);
    });

    it('REQ 2825: Should be able to edit a document cabinet name from the documents view', function() {
      documentsPage.cabinetTitle.waitReady();
      documentsPage.cabinetTitle.click();
      documentsPage.inputData.clear();
      browser.actions().sendKeys('EDITED CABINET', protractor.Key.ENTER).perform();
      documentsPage.backToCabinet.waitReady();
      documentsPage.backToCabinet.click();
      documentsPage.cabinetName.waitReady();
      expect(documentsPage.cabinetName.getText()).toBe('EDITED CABINET');
      documentsPage.cabinetName.click();

    });

    it('REQ 2829: Should be able to check-in/check-out a document', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.checkOut.waitReady();
      documentsPage.checkOut.click();
      expect(browser.isElementPresent(documentsPage.checkIn)).toBeTruthy();
      documentsPage.checkIn.click();
      expect(browser.isElementPresent(documentsPage.checkOut)).toBeTruthy();
    });

    it('REQ 2862: Save button on Upload Version is disabled until a document is uploaded', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.checkOut.waitReady();
      documentsPage.checkOut.click();
      documentsPage.versionTab.click();
      documentsPage.uploadVersion.waitReady();
      documentsPage.uploadVersion.click();
      documentsPage.saveButton.waitReady();
      expect(documentsPage.saveButton.isEnabled()).toBeFalsy();
      documentsPage.cancelButton.click();
    });

    it('REQ 2877: Upload Document Version is hidden if document is not checked out', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.versionTab.waitReady();
      documentsPage.versionTab.click();
      expect(browser.isElementPresent(documentsPage.uploadVersion)).toBeFalsy();
    });

    it('REQ 2885: A release should be able to be associated to an uploaded document', function() {
      documentsPage.addDocument(docTitle, docCategory, docDescription);
      documentsPage.categories.get(0).waitReady();
      documentsPage.categoryExpand.click();
      documentsPage.documentTitles.get(0).waitReady();
      documentsPage.documentTitles.get(0).click();
      documentsPage.checkOut.waitReady();
      documentsPage.checkOut.click();
      documentsPage.versionTab.click();
      documentsPage.uploadVersion.waitReady();
      documentsPage.uploadVersion.click();
      documentsPage.releasesInput.waitReady();
      documentsPage.releasesInput.click();
      documentsPage.releaseResult.waitReady();
      documentsPage.releaseResult.click();
      expect(documentsPage.releaseSelected.getText()).toContain('Release1');
      documentsPage.cancelButton.click();
    });

  });

});
