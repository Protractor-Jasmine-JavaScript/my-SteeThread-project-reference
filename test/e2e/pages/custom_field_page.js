'use strict';

var helper = require('../helpers/helper.js');

var CustomFieldPage = function() {

  var that = this;

  this.planningPriorityOption =
    element(by.cssContainingText('[ng-click="workspaceCustomValue.setField(field.field)"]', 'Priority'));
  this.planningStatusOption =
    element(by.cssContainingText('[ng-click="workspaceCustomValue.setField(field.field)"]', 'Status'));
  this.planningEffortOption =
    element(by.cssContainingText('[ng-click="workspaceCustomValue.setField(field.field)"]', 'Effort'));
  this.planningTypeOption =
    element(by.cssContainingText('[ng-click="workspaceCustomValue.setField(field.field)"]', 'Type'));

  this.defaultValue = element(by.model('workspaceCustomValue.defaultValues[workspaceCustomValue.currentField]'));
  this.firstOption = element(by.repeater('option in workspaceCustomValue.options').row(0));
  this.firstOptionText = this.firstOption.element(by.model('option.text'));
  this.firstOptionOfOptions = element(by.repeater('option in workspaceCustomValue.options').
    row(0)).element(by.model('option.text'));
  this.firstOptionDefaultValue =
    this.firstOption.element(by.model('workspaceCustomValue.defaultValues[workspaceCustomValue.currentField]'));
  this.dragStart =
    element.all(by.repeater('option in workspaceCustomValue.options')).get(1).element(by.css('.fa.fa-ellipsis-v'));
  this.customFieldPageTitle_text = element(by.css('.caption-subject.font-blue-hoki'));
  this.label_editBox = element(by.id('name'));
  this.checkbox_dropdownOption = element(by.cssContainingText('option', 'Checkbox'));
  this.story_checkbox = element(by.model('workspaceCustomFieldModal.editableCustomField.availableOnTask'));
  this.planning_checkbox = element(by.model('workspaceCustomFieldModal.editableCustomField.availableOnStory'));
  this.filterable_checkbox = element(by.model('workspaceCustomFieldModal.editableCustomField.isFilterable'));
  this.save_button = element(by.id('save'));
  this.createNewCustomField_button = element(by.css('.btn.btn-success'));
  this.dropdownOption_handle = element(by.css('.fa.fa-ellipsis-v'));
  this.selectOption_icon = element(by.css('[uib-tooltip="Table Options"]'));
  this.delete_menuOption = element(by.css('.fa.fa-trash-o.text-muted'));
  this.deleteConfirm_button = element(by.partialButtonText('Delete'));
  this.dropdownValue_editBox = element(by.id('dropdownValue'));
  this.dropdownName_editBox = element(by.id('dropdownName'));
  this.dropdownAdd_button = element(by.css('[ng-click="workspaceCustomFieldModal.addSelectOption()"]'));
  this.dropdownDelete_button = element(by.css('[ng-click="workspaceCustomFieldModal.deleteSelectOption($index)"]'));
  this.dropdownDelete_button_SplitView =
    element(by.css('[ng-click="workspaceCustomFieldDetail.deleteSelectOption($index)"]'));
  this.createdDropdownOptions = element.all(by.repeater('option in workspaceCustomFieldModal.selectOptions'));
  this.createdDropdownOptionsDetails = element.all(by.repeater('option in workspaceCustomFieldDetail.selectOptions'));
  //if dropdown doesn't exist, get(0) function will throw index out of bounds, so need element without element.all
  this.createdDropdownOption = element(by.repeater('option in workspaceCustomFieldModal.selectOptions'));
  this.createdDropdownOptionDetails = element(by.repeater('option in workspaceCustomFieldDetail.selectOptions'));
  this.dropdown_selectedOption = element(by.css('[selected="selected"]'));
  this.customize_value = element(by.linkUiSref('org.workspace.admin.customization.value'));
  this.delete_cog = element(by.css('[uib-tooltip="Delete"]'));
  this.enterOptionBox = element(by.model('workspaceCustomValue.newText'));
  this.addOptionButton = element(by.css('[ng-click="workspaceCustomValue.addOption()"]'));
  this.addValueAndOption_button = element(by.css('[ng-click="workspaceCustomValue.addOptionAndValue()"]'));
  this.value_editBox = element(by.id('customValue'));
  this.selectAllCustomFields = element(by.model('workspaceCustomField.checkboxes.checked'));
  /** LIST PRIORITY OPTION **/
  this.listItems = element(by.linkText('List Items'));

  this.optionExists = function() {
    return element.all(by.repeater('option in workspaceCustomValue.options')).count().then(function(count) {
      return count > 0;
    });
  };

  this.getFirstOptionText = function() {
    return this.firstOption.evaluate('option.text');
  };

  this.createdDropdownExists = function(dropdownLabel) {
    return browser.isElementPresent(this.createdDropdownOption.
      element(by.cssContainingText('td.ng-binding', dropdownLabel)));
  };

  this.createdDropdownExistsSplitView = function(dropdownLabel) {
    return browser.isElementPresent(this.createdDropdownOptionDetails.
      element(by.cssContainingText('td.ng-binding', dropdownLabel)));
  };

  this.getDropdownOption = function(number) {
    return this.createdDropdownOptions.get(number).element(by.css('td.ng-binding')).getText();
  };

  this.getDropdownOptionSplitView = function(number) {
    return this.createdDropdownOptionsDetails.get(number).element(by.css('td.ng-binding')).getText();
  };

  this.openSplitView = function(label) {
    element(by.cssContainingText('.ng-binding.ng-scope', label)).click();
  };

  this.click_dropdownDelete_button = function() {
    element(by.css('[ng-click="deleteSelectOption($index)"]')).click();
  };

  this.deleteAllCustomField = function() {
    helper.waitUntilPresent(this.selectAllCustomFields);
    this.selectAllCustomFields.click();
    this.selectOption_icon.click();
    this.delete_menuOption.click();
    this.deleteConfirm_button.click();
  };

  this.deleteOption = function(option) {
    return element.all(by.repeater('option in workspaceCustomValue.options')).filter(function(elem) {
      return elem.evaluate('option.text').then(function(text) {
        return text === option;
      });
    }).then(function(filtered) {
      filtered[0].element(by.model('workspaceCustomValue.checkboxes.items[option.value]')).click();
      that.delete_cog.click();
      that.deleteConfirm_button.click();
    });
  };

  this.getFirstCustomFieldtext_onForm = function() {
    var customField = element(by.repeater('field in customFields').
      row(0)).element.all(by.css('label.ng-scope')).get(0).getText();
    return customField;
  };

  this.getFirstCustomFieldtext_onFilter = function() {
    var customField = element(by.repeater('filter in filterOptions').
      row(10)).element(by.css('.caption.st-filter-caption.ng-binding')).getText();
    return customField;
  };
};

module.exports = CustomFieldPage;
