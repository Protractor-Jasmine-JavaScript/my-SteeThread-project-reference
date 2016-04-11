/**
 * Created by faizul on 5/15/15.
 */
var org_user_observer = browser.params.users.orgUserObserver;
var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl +'org/' + browser.params.organization.organization_name;
var ListPage = require('./../../pages/list_page.js');
var workspace = browser.params.workspace.workspace_id;
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');

describe("REQ 0000: Observer permission for list:  ", function() {
    var menu_page, list_page;

    beforeEach(function () {
        menu_page = new MenuPage();
        list_page=new ListPage();
        helper.login(org_user_observer.username, org_user_observer.password);
        helper.getUrl(org_url + workspace);
        helper.waitUntilPresent(menu_page.menuBar);
    });

    afterEach(function(){
        helper.logout();
    });

    describe("As a observer:", function () {
        it("Should not be able to see 'Add Task' in list page", function () {
            menu_page.list_menuItem.click();
            expect(browser.isElementPresent(list_page.resource_editBox)).toBeFalsy();
        });
    });
});
