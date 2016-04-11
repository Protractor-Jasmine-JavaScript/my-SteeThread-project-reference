/**
 * Created by faizul on 5/15/15.
 */
var org_user_observer = browser.params.users.orgUserObserver;
var org_admin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl +'org/' + browser.params.organization.organization_name;
var DocumentsPage = require('./../../pages/documents_page.js');
var workspace = browser.params.workspace.workspace_id;
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');

describe("REQ 0000: Observer permission for document:  ", function() {
    var menu_page, document_page;

    beforeEach(function () {
        menu_page = new MenuPage();
        document_page=new DocumentsPage();
        helper.login(org_user_observer.username, org_user_observer.password);
        helper.getUrl(org_url + workspace);
        helper.waitUntilPresent(menu_page.menuBar);
    });

    afterEach(function(){
        helper.logout();
    });

    describe("As a observer:", function () {
        it("Should not be able to see 'Add Cabinet box' in documents page", function () {
            menu_page.documents_menuItem.click();
            expect(browser.isElementPresent(document_page.cabinet_editBox)).toBeFalsy();
        });
    });
});
