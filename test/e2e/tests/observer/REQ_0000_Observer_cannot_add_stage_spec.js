/**
 * Created by faizul on 5/15/15.
 */

var org_user_observer = browser.params.users.orgUserObserver;
var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl +'org/' + browser.params.organization.organization_name;
var PlanningPage = require('./../../pages/planning_page.js');
var workspace = browser.params.workspace.workspace_id;
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');

describe("REQ 0000: Observer permission for planning: ", function() {
    var menu_page, document_page;

    beforeEach(function () {
        menu_page = new MenuPage();
        planning_page=new PlanningPage();
        helper.login(org_user_observer.username, org_user_observer.password);
        helper.getUrl(org_url + workspace);
        helper.waitUntilPresent(menu_page.menuBar);
    });

    afterEach(function(){
        helper.logout();
    });

    describe("As a observer:", function () {
        it("Should not be able to see 'Add Story Button' resource page", function () {
            element(by.linkUiSref("org.workspace.planning.wall")).click();
            expect(browser.isElementPresent(planning_page.addStoryButton)).toBeFalsy();
        });
    });
});
