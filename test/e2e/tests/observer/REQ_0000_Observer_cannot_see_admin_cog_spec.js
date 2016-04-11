/**
 * Created by faizul on 5/15/15.
 */
var org_user_observer = browser.params.users.orgUserObserver;
var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl +'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');

describe("REQ 0000: Observer permission for admin cog ", function() {
    var menu_page;

    beforeEach(function () {
        menu_page = new MenuPage();
        helper.login(org_user_observer.username, org_user_observer.password);
    });

    afterEach(function(){
        helper.logout();
    });

    describe("As a observer:", function () {

        it("Should not be able to see Workspace Admin cog menu option", function () {
            expect(browser.isElementPresent(menu_page.adminCog_icon)).toBeFalsy();
        });

        it("Should not be able to see the Admin cog on page header", function () {
            helper.getUrl(org_url + workspace);
            browser.sleep(3000);
            expect(browser.isElementPresent(menu_page.workspaceAdmin_menuItem)).toBeFalsy();
        });
    });
});

