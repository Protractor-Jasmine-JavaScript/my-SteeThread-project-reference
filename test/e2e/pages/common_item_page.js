'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var CommonItemPage = function() {

  this.addButton = element(by.partialButtonText('Add'));
  this.filterButton = element(by.partialButtonText('Filter'));
  this.saveModalButton = element(by.css('.modal-footer')).element(by.buttonText('Save'));
  this.cancelModalButton = element(by.css('.modal-footer')).element(by.buttonText('Cancel'));
  this.deleteButton = element(by.buttonText('Delete'));
  this.selectAllCheckbox = element(by.model('checkboxes.checked'));
  this.expandModal = element(by.css('.modal-more-toggle'));
  this.breadcrumb = element(by.css('.page-breadcrumb'));

  this.selectOption_icon = element(by.css('.btn.btn-sm.btn-default.dropdown-toggle.tooltips'));
  this.delete_menuOption = element(by.css('.fa.fa-trash-o.text-muted'));
  this.deleteConfirm_button = element(by.css('.btn.btn-danger.ng-binding'));

  this.clickSelectOption_icon = function() {
    this.selectOption_icon.click();
  };

  this.clickDelete_menuOption = function() {
    this.delete_menuOption.click();
  };

  this.clickDeleteConfirm_button = function() {
    this.deleteConfirm_button.click();
  };

  this.delete_selectedItem = function() {
    this.selectOption_icon.click();
    this.delete_menuOption.click();
    this.deleteConfirm_button.click();
  };

  this.selectAll = function() {
    this.selectAllCheckbox.click();
  };

  this.deleteAll = function() {
    this.selectAll();
    this.delete_selectedItem();
  };

};
module.exports = CommonItemPage;
