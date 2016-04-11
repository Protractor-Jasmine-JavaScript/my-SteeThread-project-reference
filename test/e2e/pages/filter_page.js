'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

var CommonPage = require('./common_item_page');
var common = new CommonPage();
require('../helpers/waitReady.js');

var FilterPage = function() {
  this.openFilterButton = element(by.id('open-filter'));
  this.keywordFilter = element(by.model('filter.keywordFilter'));
  this.clearFilter = element(by.buttonText('Clear'));
  this.closeFilter = element(by.id('closeSidebar'));
  this.saveFilterButton = element(by.buttonText('Save Filter'));
  this.saveFilterTitleBox = element(by.model('filterModal.filter.title'));
  this.filterCountBadge = element(by.binding('planning.getTotalCount()'));
  this.filterStageOption = element.all(by.binding('filterOption.title')).get(4);
  this.filterOtherOption = element.all(by.binding('filterOption.title')).get(13);
  this.expeditedFilterOption = element(by.cssContainingText('label', 'Is Expedited'));
  this.blockedFilterOption = element(by.cssContainingText('label', 'Is Blocked'));
  this.isCompletedFilterOptions = element.all(by.binding('filterOption.title')).get(9);
  this.completedOption = element(by.cssContainingText('label', 'Completed'));
  this.inProgressOption = element(by.cssContainingText('label', 'In Progress'));
  this.savedFilterOption = element(by.binding('filter.savedFilters.length'));
  this.savedFilterName = element(by.binding('savedFilter.title'));
  this.noStageFilter = element(by.cssContainingText('label', 'No Stage'));
  this.deleteFilterButton = element.all(by.css('button[uib-tooltip="Delete"]')).get(4);
  this.deleteConfirmButton = element(by.buttonText('Delete'));
  this.saveConfirmButton = element(by.buttonText('Save'));
};

module.exports = FilterPage;
