'use strict';
/*global describe, beforeEach, it, inject, expect, spyOn, testMocks, browser, element, by, protractor */

var orgAdmin = browser.params.users.orgAdmin;
var workspace_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace_url_table = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name + 'table/';

var WorkspaceSelectPage = require('./workspaces_tile_po.js');
var helper = require('../../helpers/helper.js');

xdescribe('REQ 0000: Organization workspaces launchpad', function() {

    var selectPage;
    var loginPage;
    var wsName;

    beforeEach(function() {
        helper.login(orgAdmin.username, orgAdmin.password);
        selectPage = new WorkspaceSelectPage();
        wsName = 'testWS-' + Date.now();
    });

    afterEach(function() {
        helper.logout();
    });

    describe('tile view', function() {
      
        it('should switch to table view when table view button clicked', function() {
            selectPage.clickTableButton();
            expect(browser.getCurrentUrl()).toEqual(workspace_url_table);
        });

        it('should do nothing when tile view button clicked', function() {
            selectPage.clickTileButton();
            expect(browser.getCurrentUrl()).toEqual(workspace_url);
        });

        it('should prevent user from creating a workspace with a name that already exists', function() {

            selectPage.createWorkspace(wsName, 'test', 'test', orgAdmin.username);
            selectPage.saveWorkspace();
            selectPage.createWorkspace(wsName, 'test', 'test', orgAdmin.username);
            selectPage.saveWorkspace();
            var err_msg = selectPage.modalErrorMsg();
            expect(err_msg.getText()).toEqual('A workspace with that name already exists for this organization.');
            element(by.css('.fa.fa-times-circle.text-muted.st-close')).click();
        });

       // it('should delete a workspace', function() {
       //     selectPage.createWorkspace(wsName, 'delete test', 'delete test', orgAdmin.username);
       //     selectPage.saveWorkspace();
       //     selectPage.getWsSlugId(0).then(function(slugId) {
       //         expect(selectPage.wsExists(slugId)).toBe(true);
       //         selectPage.deleteWorkspace(0);
       //         expect(selectPage.wsExists(slugId)).toBe(false);
       //     });
       //
       // });
       //
       // it('should edit the workspace title', function() {
       //     selectPage.createWorkspace(wsName, 'edit test', 'edit test', orgAdmin.username);
       //     selectPage.saveWorkspace();
       //     var newTitle = wsName + '-1';
       //     selectPage.getWsSlugId(0).then(function(slugId) {
       //         selectPage.editWorkspace(0, newTitle, 'test', 'test', orgAdmin.username);
       //         selectPage.saveWorkspace();
       //         expect(selectPage.getWsNameBySlugId(slugId)).toBe(newTitle);
       //     });
       //});

        describe('new workspace modal', function() {

            it('should close with the cancel button', function() {

                selectPage.clickCreateWorkspace();
                expect(selectPage.name.isDisplayed()).toBeTruthy();
                expect(selectPage.tagline.isDisplayed()).toBeTruthy();
                expect(selectPage.description.isDisplayed()).toBeTruthy();
                selectPage.exitWorkspaceByCancel();

            });

            it('should close with the X button in the title bar', function() {

                selectPage.clickCreateWorkspace();
                expect(selectPage.name.isDisplayed()).toBeTruthy();
                expect(selectPage.tagline.isDisplayed()).toBeTruthy();
                expect(selectPage.description.isDisplayed()).toBeTruthy();
                selectPage.exitWorkspaceByX();

            });

            it('save button should be disabled when required fields empty', function() {

                selectPage.clickCreateWorkspace();
                expect(selectPage.name.isDisplayed()).toBeTruthy();
                expect(selectPage.tagline.isDisplayed()).toBeTruthy();
                expect(selectPage.description.isDisplayed()).toBeTruthy();
                expect(selectPage.saveButton.isEnabled()).toBe(false);
                element(by.css('.fa.fa-times-circle.text-muted.st-close')).click();
            });

        });

    });

    //xdescribe('table view', function() {
    //
    //    it('Should  switch to table view', function() {
    //        selectPage.clickTableButton();
    //        expect(browser.getCurrentUrl()).toEqual(workspace_url_table);
    //    });
    //
    //    it('Should add a new workspace', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('test', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        expect(selectPage.confirmWorkspaceName('test').getText()).toEqual('test');
    //        selectPage.createWorkspace('test', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        var err_msg = selectPage.modalErrorMsg();
    //        expect(err_msg.getText()).toEqual('A workspace with that name already exists for this admin.');
    //    });
    //
    //    //it('Should delete the newly created workspace', function() {
    //    //    selectPage.clickTableButton();
    //    //    selectPage.deleteWorkspaceTable(0);
    //    //    expect(selectPage.confirmWorkspaceName('test').isPresent()).toBeFalsy();
    //    //
    //    //});
    //
    //    //Testing of the sorting functions.
    //    it('Should sort the workspaces by name', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('aTest', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('bTest', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('cTest', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        //order should be 'aTest' then 'bTest' then 'cTest'
    //        //This is not in the page object because it was returning undefined. Maybe a scope issue?
    //        // Or a promise issue?
    //        //Reason for elems 0,2,4: column('name') gets both columns workspace.name and owner.username.
    //        // Need to skip over owner.username.
    //        element.all(by.repeater('workspace in $data').column('name')).then(function(elems) {
    //            expect(elems[0].getText()).toEqual('aTest');
    //            expect(elems[2].getText()).toEqual('bTest');
    //            expect(elems[4].getText()).toEqual('cTest');
    //        });
    //        selectPage.clickSortName();
    //        //order should be 'cTest' then 'bTest' then 'cTest'
    //        element.all(by.repeater('workspace in $data').column('name')).then(function(elems) {
    //            expect(elems[0].getText()).toEqual('cTest');
    //            expect(elems[2].getText()).toEqual('bTest');
    //            expect(elems[4].getText()).toEqual('aTest');
    //        });
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //    it('Should sort the workspaces by Tagline', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('aTest', 'blah', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('bTest', '', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('cTest', 'Continuous Integration', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //
    //        selectPage.clickSortTagline();
    //        //order should be ('','Continuous Integration','blah')
    //        element.all(by.repeater('workspace in $data').column('tagline')).then(function(elems) {
    //            expect(elems[0].getText()).toEqual('');
    //            expect(elems[1].getText()).toEqual('Continuous Integration');
    //            expect(elems[2].getText()).toEqual('blah');
    //        });
    //        selectPage.clickSortTagline();
    //        //order should be ('blah','Continuous Integration','')
    //        element.all(by.repeater('workspace in $data').column('tagline')).then(function(elems) {
    //            expect(elems[0].getText()).toEqual('blah');
    //            expect(elems[1].getText()).toEqual('Continuous Integration');
    //            expect(elems[2].getText()).toEqual('');
    //        });
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //    it('Should sort the workspaces by ID', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('first', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('second', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('last', 'test', 'test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //
    //        selectPage.clickSortID();
    //        //Instead of checking ID since it is randomly generated, I can check the name is in the
    //        // right place when sorted by ID. Could probably be changed
    //        //if needed but for now it works.
    //        //using indexes 0, 2, 4 for same reasons used in sorting by name.
    //        //order should be ('last','second','first')
    //        element.all(by.repeater('workspace in $data').column('name')).then(function (elems) {
    //            expect(elems[0].getText()).toEqual('last');
    //            expect(elems[2].getText()).toEqual('second');
    //            expect(elems[4].getText()).toEqual('first');
    //        });
    //
    //        selectPage.clickSortID();
    //        //order should be ('first','second','last')
    //        element.all(by.repeater('workspace in $data').column('name')).then(function (elems) {
    //            expect(elems[0].getText()).toEqual('first');
    //            expect(elems[2].getText()).toEqual('second');
    //            expect(elems[4].getText()).toEqual('last');
    //        });
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //    it('Should add a comment to the workspace', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('comments','comments','comments', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.addComment(0, 'Test Comment');
    //        element.all(by.repeater('historyItem in history')).then(function(elems) {
    //            elems[0].element(by.css('dd.ng-binding')).getText().then(function(text) {
    //                expect(text.substring(0,12)).toBe('Test Comment');
    //            });
    //        });
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //    it('Should edit the selected workspace tagline in table view', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('tagline','test','test',orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.clickRow(0);
    //        expect(selectPage.workspaceTitleTable.getText()).toBe('tagline');
    //        selectPage.editTagline('New Tagline');
    //        expect(selectPage.taglineTable.getText()).toBe('New Tagline');
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //    it('Should add a description to the created workspace', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('description','test','test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.clickRow(0);
    //        selectPage.editDescription('New Description');
    //        expect(selectPage.descriptionText.getText()).toBe('New Description');
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //    it('Should filter the table so that only the filtered result is shown', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('filter','test','test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('filter again UNIQUESTRING','test','test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.filterTable('filter');
    //        expect(selectPage.confirmWorkspaceName('filter again UNIQUESTRING').isPresent()).toBeTruthy();
    //        expect(selectPage.confirmWorkspaceName('filter').isPresent()).toBeTruthy();
    //        selectPage.filterTable('UNIQUESTRING');
    //        expect(selectPage.confirmWorkspaceName('filter again UNIQUESTRING').isPresent()).toBeTruthy();
    //        expect(selectPage.confirmWorkspaceName('filter').isPresent()).toBeTruthy();
    //        selectPage.filter.clear();
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //    it('Should filter the table so that no results are shown', function() {
    //        selectPage.clickTableButton();
    //        selectPage.createWorkspace('filter','test','test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.createWorkspace('filter again te go string element NOFILTE...','test','test', orgAdmin.username);
    //        selectPage.saveWorkspace();
    //        selectPage.filterTable('NOFILTER');
    //        expect(selectPage.filterMsg.getText()).toBe('No Workspaces Found.');
    //        selectPage.filter.clear();
    //        selectPage.deleteAllWorkspacesTable();
    //    });
    //
    //});
});
