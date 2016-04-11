/**
 *
 * Contains elements and functions used for testing the list functionality of workspaces.
 */
'use strict';

var workspaceListPage = function() {

    this.sidebarListButton = element(by.id('sidebar_list'));
    this.addListInput = element.all(by.model('$parent.taskListTitle'));
    this.addListItemInput = element(by.model('$parent.taskTitle'));

    this.addList = function(name) {
        this.addListInput.get(1).clear();
        this.addListInput.get(1).sendKeys(name);
        this.addListInput.get(1).sendKeys(protractor.Key.ENTER);
    };

    this.addMultipleLists = function(num) {
        for (var i = 0; i < num; ++i) {
            this.addListInput.get(1).clear();
            this.addListInput.get(1).sendKeys('number ' + i);
            this.addListInput.get(1).sendKeys(protractor.Key.ENTER);
        }
    };

    this.clickList = function(listName) {
        element(by.xpath('//a[contains(text(),"' + listName + '")]')).click();
    };

    this.addListItem = function(name) {
        this.addListItemInput.clear();
        this.addListItemInput.sendKeys(name);
        this.addListItemInput.sendKeys(protractor.Key.ENTER);
    };

    this.addMultipleListItems = function(num) {
        for (var i = 0; i < num; ++i) {
            this.addListItemInput.clear();
            this.addListItemInput.sendKeys('List Item ' + i);
            this.addListItemInput.sendKeys(protractor.Key.ENTER);
        }
    };
};

module.exports = workspaceListPage;