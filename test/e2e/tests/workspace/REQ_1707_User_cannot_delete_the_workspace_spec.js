/**
 * Created by faizul on 3/24/15.
 */


var username = browser.params.users.orgUser.username;
var password = browser.params.users.orgUser.password;
var org_url = browser.params.url.baseUrl +'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var WorkspaceTilePage = require('./workspaces_tile_po.js');
var WorkspaceTablePage = require('./workspaces_table_po.js');
var helper = require('../../helpers/helper.js');

xdescribe("REQ 1707: User cannot delete the workspace", function() {
    var login_page;
    var workspace_tile_page;
    var workspace_table_page;
    var WSname;

    beforeEach(function () {
        login_page = new LoginPage();
        workspace_tile_page = new WorkspaceTilePage();
        workspace_table_page = new WorkspaceTablePage();
        helper.login(username,password);

    });

    afterEach(function(){
        workspace_table_page.deleteWorkspace(0);
        helper.logout();
    });

    describe("User cannot delete the workspace :", function () {

        it("Should be able to delete a workspace", function () {
            WSname = 'TestWS_' + helper.getRandomString(5);
            helper.getUrl(org_url);
            browser.sleep(2000);
            workspace_tile_page.clickTableButton();
            var beforeCreatingWorkspace = element(by.repeater('workspace in workspaces').row(0)).getText();
            workspace_tile_page.createWorkspace(WSname, 'test', 'test', username);
            workspace_tile_page.saveWorkspace();
            var afterCreatingWorkspace = element(by.repeater('workspace in workspaces').row(0)).getText();
            expect(beforeCreatingWorkspace).not.toEqual(afterCreatingWorkspace);
        });
    });

});
