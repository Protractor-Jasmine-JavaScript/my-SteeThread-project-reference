'use strict';

var WorkspacePage = function() {

  this.createWorkspaceButton = element(by.linkText('Add'));
  this.tableButton = element(by.id('table'));
  this.tileButton = element(by.id('tile'));
  // this.testWorkspace = element(by.xpath('//a[contains(text(),"'+browser.params.workspace.workspace_name+'")]'));
  this.saveButton = element(by.id('save'));
  this.xButton = element(by.id('close'));
  this.cancelButton = element(by.id('cancel'));
  this.name = element(by.id('name'));
  this.tagline = element(by.id('tagline'));
  this.description = element(by.id('description'));
  this.modal_err_msg = element(by.css('div.alert.alert-error.ng-scope'));
  this.sortID = element(by.repeater('column in columns')).element(by.xpath('//div[contains(text(),"ID")]'));
  this.sortName = element(by.repeater('column in columns')).element(by.xpath('//div[contains(text(),"Name")]'));
  this.sortTagline = element(by.repeater('column in columns')).element(by.xpath('//div[contains(text(),"Tagline")]'));
  this.workspaceTitleTable = element(by.css('span.caption-subject.font-blue-hoki.ng-binding'));
  this.descriptionEdit = element(by.id('descriptionEdit'));
  this.descriptionTextBox = element(by.model('w.description'));
  this.descriptionText = element(by.css('p.ng-binding.ng-scope'));
  this.taglineEdit = element(by.model('w.tagline'));
  this.filter = element(by.model('workspaceFilter.value'));
  this.filterMsg = element(by.xpath('//span[contains(text(),"No Workspaces Found")]'));

  this.getUrl = function() {
    browser.get('org/'+browser.params.organization.organization_name);
  };

  //this.getWs = function(wsName, cb) {
  //    element.all(by.repeater('workspace in workspaces')).then(function(workspaces) {
  //        workspaces.forEach(function(workspace) {
  //            workspace.getAttribute('id').then(function (id) {
  //                console.log('the id: ', id, ' the wsname : ', wsName );
  //                if (id === wsName) {
  //                    console.log('returning the workspace');
  //                    return cb(workspace);
  //                }
  //            });
  //        });
  //        console.log('returning null');
  //        cb(null);
  //    });
  //    console.log('outside');
  //};

  this.createWorkspace = function(name, tagline, description, owner) {
    browser.sleep(500);
    this.createWorkspaceButton.click();
    this.name.sendKeys(name);
    this.tagline.sendKeys(tagline);
    this.description.sendKeys(description);
    //this.owner = element(by.cssContainingText('option', owner));
    //this.owner.click();
  };

  this.deleteWorkspace = function(rowNum) {
    var ws = element(by.repeater('w in workspaces').row(rowNum)); //this.getWs(wsName); //
    ws.element(by.css('button.dropdown-toggle')).click();
    ws.element(by.id('deleteWorkspace')).click();
    element(by.css('button.btn.btn-danger')).click();
    browser.sleep(500);
  };

  this.deleteAllWorkspaces = function() {
    element.all(by.repeater('w in workspaces')).then(function(rows) {
      for(var i = 0; i < rows.length; ++i) {
        element(by.repeater('w in workspaces').row(0))
          .element(by.css('button.btn.btn-default.dropdown-toggle')).click();
        element(by.repeater('w in workspaces').row(0)).element(by.id('deleteWorkspace')).click();
        element(by.css('button.btn.btn-danger')).click();
        browser.sleep(500);
      }
    });
  };

  this.editWorkspace = function(rowNum, name, tagline, description, owner) {
    var ws = element(by.repeater('w in workspaces').row(rowNum)); //this.getWs(wsName);
    ws.element(by.css('button.btn.btn-default.dropdown-toggle')).click();
    ws.element(by.id('editWorkspace')).click();
    browser.sleep(500);
    this.name.clear();
    this.tagline.clear();
    this.description.clear();
    this.name.sendKeys(name);
    this.tagline.sendKeys(tagline);
    this.description.sendKeys(description);
    this.owner = element(by.cssContainingText('option', owner));
    this.owner.click();
  };

  this.clickCreateWorkspace = function() {
    this.createWorkspaceButton.click();
    browser.sleep(500);
  };

  this.clickWorkspace = function(workspaceName) {

    element(by.xpath('//a[contains(text(),"'+workspaceName+'")]')).click();

  };

  this.confirmWorkspaceName = function(name) {
    return element(by.xpath('//a[contains(text(),"'+name+'")]'));
  };

  this.numOfWorkspaces = function() {//not working atm, will revisit later
    element.all(by.repeater('w in workspaces')).then(function(rows) {
      return rows.length;
    });
  };

  this.getWsNameBySlugId = function(slugId) {
    return element.all(by.repeater('w in workspaces')).filter(function(elem) {
      return elem.evaluate('w.slugId').then(function(text) {
        return text === slugId;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0].evaluate('w.name') : '';
    });
  };

  this.getWsSlugId = function(rowNum) {
    return element(by.repeater('w in workspaces').row(rowNum)).evaluate('w.slugId');
  };

  this.wsExists = function(slugId) {
    return element.all(by.repeater('w in workspaces')).filter(function(elem) {
      return elem.evaluate('w.slugId').then(function(text) {
        return text === slugId;
      });
    }).then(function(filteredElements) {
      return filteredElements.length > 0;
    });
  };

  this.exitWorkspaceByX = function() {
    this.xButton.click();
  };

  this.exitWorkspaceByCancel = function() {
    this.cancelButton.click();
  };

  this.saveWorkspace = function() {
    this.saveButton.click();
    browser.sleep(500);
  };

  this.clickTableButton = function() {
    this.tableButton.click();
  };

  this.clickTileButton = function() {
    this.tileButton.click();
  };

  this.modalErrorMsg = function() {
    return this.modal_err_msg;
  };

  this.clickSortID = function() {
    this.sortID.click();
  };

  this.clickSortName = function() {
    this.sortName.click();
  };

  this.clickSortTagline = function() {
    this.sortTagline.click();
  };

  this.editDescription = function(newDescription) {
    this.descriptionEdit.click();
    this.descriptionTextBox.clear();
    this.descriptionTextBox.sendKeys(newDescription);
    this.taglineEdit.click();
  };

  this.addComment = function(rowNum, comment) {
    element.all(by.repeater('w in workspaces')).then(function(rows) {
      rows[rowNum].click();
    });
    element(by.id('comments')).click();
    element(by.model('newComment')).sendKeys(comment);
    element(by.id('addComment')).click();
  };
  this.editTagline = function(newTag) {
    this.taglineEdit.clear();
    this.taglineEdit.sendKeys(newTag);
    this.taglineEdit.sendKeys(protractor.Key.ENTER);
  };

  this.filterTable = function(filterText) {
    this.filter.clear();
    this.filter.sendKeys(filterText);
    this.filter.sendKeys(protractor.Key.ENTER);
  };
};

module.exports = WorkspacePage;
