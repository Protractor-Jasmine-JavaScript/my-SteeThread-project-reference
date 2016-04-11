///**
// * Created by faizul on 5/21/15.
// */
//
///**
// * Created by faizul on 4/21/15.
// */
//
//
//var orgAdmin = browser.params.users.orgAdmin;
//var orgUser = browser.params.users.orgUser;
//var org_url = browser.params.url.baseUrl +'org/' + browser.params.organization.organization_name;
//var workspace = browser.params.workspace.workspace_id;
//
//
//var PlanningPage = require('./../../pages/planning_page.js');
//var MenuPage = require('./../../pages/menuItem_page');
//var WorkspaceSelectPage = require('./workspaces_table_po.js');
//var CommonPage = require('./../../pages/common_item_page');
//var helper = require('../../helpers/helper.js');
//
//xdescribe("REQ_0000: Clean up extra workspaces", function() {
//    var ws_page;
//
//    beforeEach(function () {
//        ws_page = new WorkspaceSelectPage();
//        helper.login(orgAdmin.username, orgAdmin.password);
//    });
//
//    afterEach(function(){
//        helper.logout();
//    });
//
//    describe("Org Admin ", function () {
//        it("Should be able to delete all'", function () {
//        element(by.id("table")).click();
//        var WS_ID = workspace.slice(0, -1);
//        ws_page.deleteAllWorkspaceBut(WS_ID);
//        });
//    });
//});
//
