'use strict';

var helper = require('../helpers/helper.js');
require('../helpers/waitReady.js');

var ListPage = function() {

  this.addNewListBox = element(by.model('lists.taskListTitle'));
  this.add_button = element(by.buttonText('Add'));
  this.addListButton = element(by.id('quick-add-list-submit'));
  this.save_button = element(by.css('.btn.btn-success.save'));
  this.lists = element.all(by.repeater('list in lists.taskLists track by list.id'));
  this.deleteList = element.all(by.css('button[uib-tooltip="Delete"]'));
  this.resource_editBox = element(by.css('input[placeholder="Add New Resource"]'));
  this.selectOption_icon = element(by.css('.btn.btn-sm.btn-default.dropdown-toggle.tooltips'));
  this.delete_menuOption = element(by.css('.fa.fa-trash-o.text-muted'));
  this.deleteConfirm_button = element(by.css('.btn.btn-danger.ng-binding'));
  this.search_Box = element(by.model('resourceFilter.value'));
  this.subTask = element(by.cssContainingText('span.ng-binding', 'Tasks'));
  this.selectAllCheckbox = element(by.model('listLanding.checkboxes.checked'));
  this.selectedOptions = element(by.css('button[uib-tooltip="Table Options"]'));
  this.completeTask = element(by.css('span[uib-tooltip="Complete Task"]'));
  this.taskTitle = element(by.binding('item.title'));
  this.deleteOption = element(by.linkText('Delete'));
  this.deleteConfirm = element(by.css('.btn.btn-danger.ng-binding'));
  /** TASK ITEM MODAL FIELDS **/
  this.taskModalTitle = element(by.model('itemModal.item.title'));
  this.taskModalDescription = element(by.model('itemModal.item.description'));
  this.taskModalSchedule = element(by.id('schedule'));
  this.taskModalPriority = element(by.model('itemModal.item.priority'));
  this.taskModalAssigned = element(by.css('input[placeholder="Assigned To"]'));
  this.taskModalTags = element.all(by.model('newTag.text')).get(1);
  this.taskModalAttachment = element(by.id('attachments'));
  this.taskModalNotes = element(by.model('itemModal.item.notes'));
  this.saveModalButton = element(by.css('.modal-footer')).element(by.buttonText('Save'));
  this.cancelModalButton = element(by.buttonText('Cancel'));
  /** TASK SPLIT VIEW FIELDS **/
  this.firstTaskItem = element(by.repeater('item in list.tasks track by item.id'));
  this.splitViewDescription = element(by.model('item.item.description'));
  this.splitViewOwner = element(by.binding('item.item.owner.firstname'));
  this.splitViewSchedule = element(by.binding('item.item.startDate'));
  this.splitViewPriority = element(by.model('item.item.priority'));
  this.splitViewAssigned = element(by.css('input[selected-users="item.item.assigned"]'));
  this.splitViewTags = element(by.model('newTag.text'));
  this.splitViewAttachment =
    element(by.css('span[ng-if="(!item.item.attachments || item.item.attachments.length == 0)"]'));
  this.splitViewNotes = element(by.model('item.item.notes'));
  /** SUBTASK ITEMS **/
  this.tasks = element.all(by.repeater('subTask in item.item.subTasks track by subTask.id'));
  this.subTaskTitle = element(by.binding('subTask.title'));
  this.existingTag = element(by.binding('$getDisplayText()'));
  this.addNewTaskItemButton = element(by.css('button[uib-tooltip="Add Task"]'));

  this.deleteAllLists = function() {
    this.addNewListBox.waitReady('withRefresh');
    this.lists.then(function(items) {
      var i;
      for (i = 0; i < items.length; i++) {
        browser.actions().mouseMove(element.all(by.repeater('list in lists.taskLists track by list.id')).get(0)).perform();
        //element.all(by.repeater('list in lists.taskLists track by list.id')).get(0).element(by.css('button[uib-tooltip="Delete"]')).waitReady();
        element.all(by.repeater('list in lists.taskLists track by list.id')).get(0).element(by.css('button[uib-tooltip="Delete"]')).click();
        element(by.css('.btn.btn-danger.ng-binding')).waitReady();
        element(by.css('.btn.btn-danger.ng-binding')).click();
        browser.sleep(1000);//wait for delete to finish
      }
    });
  };

  this.clickOnNewList = function() {
    element.all(by.repeater('list in lists.taskLists track by list.id')).get(0).element(by.binding('list.title')).click();
  };

  this.getTextFromTask = function(rownum) {
    element(by.repeater('item in list.tasks track by item.id')).waitReady('withRefresh');
    return element(by.repeater('item in list.tasks track by item.id').row(rownum).column('item.title')).getText();
  };

  this.deleteSelectedTask = function(rownum) {
    element.all(by.repeater('item in list.tasks track by item.id')).
      get(rownum).element(by.model('list.checkboxes.items[item.id]')).click();
    element.all(by.css('button[uib-tooltip="Delete"]')).get(1).click();
    this.deleteConfirm.click();
  };

  this.enterItemTitle = function(testTitle) {
    this.taskModalTitle.waitReady();
    this.taskModalTitle.sendKeys(testTitle);
  };

  this.getAddItemModalTitle = function() {
    return element(by.css('.modal-title.ng-binding')).getText();
  };

  this.isListEmpty = function() {
    element(by.css('.fa.fa-ban')).waitReady();
    return browser.isElementPresent(element(by.css('.fa.fa-ban')));
  };
};

module.exports = ListPage;
