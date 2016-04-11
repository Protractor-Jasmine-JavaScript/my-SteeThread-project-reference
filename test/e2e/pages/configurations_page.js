/**
 * Created by faizul on 5/19/15.
 */

'use strict';

var helper = require('../helpers/helper.js');
require('../helpers/waitReady.js');

var ConfigurationsPage = function() {
  this.configurationPlanning = element(by.linkUiSref('org.workspace.admin.configuration.planning'));
  this.hideDescription = element(by.model('planning.workspace.configuration.planning.hideDescription'));

  this.deleteFeature = function() {
    element(by.repeater('feature in planning.features')).waitReady('withRefresh');
    var feature = element.all(by.repeater('feature in planning.features')).get(0);
    browser.actions().mouseMove(feature.element(by.model('feature.title'))).perform();
    feature.element(by.css('[uib-tooltip="Delete"]')).click();
    element(by.css('[ng-click="confirmation.delete()"]')).click();
  };

  this.deleteTag = function() {
    element(by.repeater('tag in general.tags')).waitReady('withRefresh');
    var tag = element.all(by.repeater('tag in general.tags')).get(0);
    browser.actions().mouseMove(tag.element(by.model('tag.text'))).perform();
    tag.element(by.css('[uib-tooltip="Delete"]')).click();
    element(by.css('[ng-click="confirmation.delete()"]')).click();
  };

  this.editTagName = function(newTagName) {
    element(by.repeater('tag in general.tags')).waitReady('withRefresh');
    var feature = element.all(by.repeater('tag in general.tags')).get(0);
    feature.element(by.model('tag.text')).click();
    feature.element(by.model('tag.text')).clear();
    feature.element(by.model('tag.text')).sendKeys(newTagName);
  };

  this.editFeatureName = function(newFeatureName) {
    element(by.repeater('feature in planning.features')).waitReady('withRefresh');
    var feature = element.all(by.repeater('feature in planning.features')).get(0);
    feature.element(by.model('feature.title')).click();
    feature.element(by.model('feature.title')).clear();
    feature.element(by.model('feature.title')).sendKeys(newFeatureName);
  };

};
module.exports = ConfigurationsPage;
