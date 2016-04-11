/**
 */
require('../helpers/waitReady.js');

var PlanningModalPage = function() {
  this.title = element(by.model('planningModal.item.title'));
  this.description = element(by.model('planningModal.item.description'));
  this.priority_dropdown = element(by.model('planningModal.item.priority'));
  this.selectedPriority = this.priority_dropdown.element(by.binding('$select.selected.text'));
  this.effort_dropdown = element(by.model('planningModal.item.effort'));
  this.selectedEffort = this.effort_dropdown.element(by.binding('$select.selected.text'));
  this.type_dropdown = element(by.model('planningModal.item.type'));
  this.selectedType = this.type_dropdown.element(by.binding('$select.selected.text'));
  this.status_dropdown = element(by.model('planningModal.item.status'));
  this.selectedStatus = this.status_dropdown.element(by.binding('$select.selected.text'));
  this.stage_dropdown = element(by.model('planningModal.item.step'));
  this.selectedStage = this.stage_dropdown.element(by.binding('$select.selected.text'));
  this.owner = element(by.css('input[selected-users="owner"]'));
  this.ownerDropdown = element.all(by.css('.tt-dropdown-menu')).get(3);
  this.selectedOwner = element(by.binding('user.firstname'));
  this.assigned = element(by.css('input[selected-users="planningModal.assigned"]'));
  this.assignedDropdown = element.all(by.css('.tt-dropdown-menu')).get(4);
  this.selectedAssigned = element(by.binding('user.firstname'));
  this.schedule = element(by.id('schedule'));
  this.feature = element(by.model('planningModal.features'));
  this.releaseDropdown = element(by.model('planningModal.item.release'));
  this.releaseResultSlugID = element(by.binding('release.slugId'));
  this.releaseDescriptionHover = element(by.css('.tooltip'));
  this.tags = element(by.model('planningModal.tags'));
  this.attachments = element(by.css('.addAttachments'));
  this.associations = element.all(by.model('newTag.text')).get(2);
  this.associationsDropdown = element(by.css('.suggestion-list'));
  this.selectedAssociations = element.all(by.repeater('tag in tagList.items track by track(tag)'));
  this.notes = element(by.model('planningModal.item.notes'));
  this.blocked = element(by.model('planningModal.item.blocked'));
  this.blockedComment = element(by.model('planningModal.item.blockedComment'));
  this.expedited = element(by.model('planningModal.item.expedite'));
  this.associationTab = element(by.css('button[uib-tooltip="Associations"]'));
  this.associationsList = element(by.repeater('association in stsStoryAssociation.associatedStories'));
  this.associationTitle = element(by.binding('association.title'));
  this.associationID = element(by.binding('association.title'));
  this.associationType = element(by.binding('association.type'));
  this.associationStatus = element(by.binding('association.status'));
  this.save_button = element(by.buttonText('Save'));
  this.close_button = element(by.id('close'));
  /**
   * Tasks
   */
  this.tasks = element.all(by.repeater('storytask in stsPlanning.displayedStorytasks'));
  this.taskTab = element(by.css('button[uib-tooltip="Tasks"]'));
  this.addTask = element(by.css('button[uib-tooltip="Add Task"]'));
  this.deleteTaskButton = element(by.css('button[on-delete="stsPlanning.deleteTask(storytask)"]'));
  this.confirmDelete = element(by.buttonText('Delete'));
  this.saveTask = element.all(by.buttonText('Save')).get(1);
  this.cancelTask = element.all(by.buttonText('Cancel')).get(1);
  this.taskTitle = element(by.model('storyTaskModal.item.title'));
  this.taskDescription = element(by.model('storyTaskModal.item.description'));
  this.taskNotes = element(by.model('storyTaskModal.item.notes'));
  this.priorityDropdownTask = element(by.model('storyTaskModal.item.priority'));
  this.selectedPriorityTask = this.priorityDropdownTask.element(by.binding('$select.selected.text'));
  this.effortDropdownTask = element(by.model('storyTaskModal.item.effort'));
  this.selectedEffortTask = this.effortDropdownTask.element(by.binding('$select.selected.text'));
  this.assignedTask = element(by.css('input[selected-users="storyTaskModal.assigned"]'));
  this.assignedDropdownTask = element.all(by.css('.tt-dropdown-menu')).get(3);
  this.assignedDropdownSelected = element(by.binding('user.firstname'));
  this.taskNotCompleted = element(by.css('.fa.fa-circle-o.text-muted'));
  this.taskCompleted = element(by.css('.fa.fa-check-circle-o.text-muted'));

  this.selectPriority = function(priority) {
    this.priority_dropdown.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', priority)).click();
  };

  this.selectType = function(type) {
    this.type_dropdown.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', type)).click();
  };

  this.selectStatus = function(status) {
    this.status_dropdown.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', status)).click();
  };

  this.selectEffort = function(effort) {
    this.effort_dropdown.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', effort)).click();
  };

  this.selectStage = function(stage) {
    this.stage_dropdown.waitReady();
    this.stage_dropdown.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', stage)).click();
  };

  this.priorityOptionExists = function(option) {
    this.priority_dropdown.waitReady();
    this.priority_dropdown.click();
    return browser.isElementPresent(element(by.cssContainingText('.ui-select-choices-row-inner', option)));
  };

  this.statusOptionExists = function(option) {
    this.status_dropdown.waitReady();
    this.status_dropdown.click();
    return browser.isElementPresent(element(by.cssContainingText('.ui-select-choices-row-inner', option)));
  };

  this.effortOptionExists = function(option) {
    this.effort_dropdown.waitReady();
    this.effort_dropdown.click();
    return browser.isElementPresent(element(by.cssContainingText('.ui-select-choices-row-inner', option)));
  };

  this.typeOptionExists = function(option) {
    this.type_dropdown.waitReady();
    this.type_dropdown.click();
    return browser.isElementPresent(element(by.cssContainingText('.ui-select-choices-row-inner', option)));
  };

  this.customFieldExists = function() {
    return browser.isElementPresent(element(by.css('sts-custom-field')));
  };

  /**
   * Tasks
   */
  this.taskIsCreatedAndPresent = function() {
    this.tasks.get(0).waitReady();
    return browser.isElementPresent(this.tasks.get(0));
  };

  this.deleteTask = function(num) {
    browser.actions().mouseMove(this.tasks.get(num)).perform();
    this.deleteTaskButton.click();
    this.confirmDelete.waitReady();
    this.confirmDelete.click();
  };

  this.noTasks = function() {
    element.all(by.css('h3')).get(4).waitReady();
    return browser.isElementPresent(element.all(by.css('h3')).get(4));
  };

  this.selectPriorityTask = function(priority) {
    this.priorityDropdownTask.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', priority)).click();
  };

  this.selectEffortTask = function(effort) {
    this.effortDropdownTask.click();
    element(by.cssContainingText('.ui-select-choices-row-inner', effort)).click();
  };

};

module.exports = PlanningModalPage;
