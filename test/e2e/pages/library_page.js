/**
 * Created by faizul on 3/31/15.
 */

'use strict';

var LibraryPage = function() {

  this.resource_editBox = element(by.css('input[placeholder="Add New Resource"]'));
  this.add_button = element(by.css('.btn.btn-success'));
  this.cabinetResources = element.all(by.repeater('resource in library.resources'));
  this.delete_menuOption = element(by.css('.fa.fa-trash-o.text-muted'));
  this.deleteConfirm_button =
  this.search_Box = element(by.model('resourceFilter.value'));
  this.save_button = element(by.css('.btn.btn-success.save'));
  this.first_resourceTitle_onSubMenu = element.all(by.repeater('resource in workspace.resources'))
    .get(0).element(by.css('a'));
  this.cabinetTitle_editBox = element(by.model('$data'));
  this.deleteAllCheckbox = element(by.model('library.checkboxes.checked'));
  this.selectedOptions = element(by.css('.btn.btn-sm.btn-default.dropdown-toggle.tooltips'));
  this.deleteOption = element(by.linkText('Delete'));
  this.deleteConfirm = element(by.css('.btn.btn-danger.ng-binding'));

  this.deleteAllResources = function() {
    this.deleteAllCheckbox.click();
    this.selectedOptions.click();
    this.deleteOption.click();
    this.deleteConfirm.click();
  };

  this.clickOnResourceTitle_ResourcePage = function() {
    element(by.css('.ng-binding.ng-scope.editable.editable-click')).click();
  };

  this.enterNewResourceName = function(NewDocName) {
    this.resource_editBox.sendKeys(NewDocName);
  };

  this.enterSearchData = function(searchData) {
    this.search_Box.sendKeys(searchData);
  };

  this.enterNewResourcesName_OnSubMenu = function(ResourceName) {
    browser.actions().mouseMove(element(by.css('[placeholder="Add Resource"]'))).perform();
    element.all(by.css('[placeholder="Add Resource"]')).then(function(elm) {
      elm[0].sendKeys(ResourceName);
    });
  };
};

module.exports = LibraryPage;
