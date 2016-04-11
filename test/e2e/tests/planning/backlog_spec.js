/**
 */

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */
'use strict';

var org_user = browser.params.users.orgUser;
var orgAdmin = browser.params.users.orgAdmin;
var org_url = browser.params.url.baseUrl + 'org/' + browser.params.organization.organization_name;
var workspace = browser.params.workspace.workspace_id;

var LoginPage = require('./../../pages/login_page.js');
var helper = require('../../helpers/helper.js');
var MenuPage = require('./../../pages/menuItem_page');
var CommonPage = require('./../../pages/common_item_page');
var PlanningPage = require('./../../pages/planning_page');
var PlanningBacklogPage = require('./../../pages/planning_backlog_page');
var PlanningModalPage = require('./../../pages/planning_modal_page');
var PlanningBacklogModalPage = require('./../../pages/planning_backlog_modal_page');
var ReleasePage = require('./../../pages/release_page');
var ConfigurationPage = require('./../../pages/configurations_page.js');
require('../../helpers/waitReady.js');

describe('Planning Wall: ', function() {
  var loginPage;
  var menuPage;
  var commonPage;
  var planningPage;
  var planningModal;
  var planningBacklog;
  var planningBacklogModal;
  var releasePage;
  var configurationPage;
  var newTitle;
  var newTitle2;
  var newString;

  beforeEach(function() {
    loginPage = new LoginPage();
    menuPage = new MenuPage();
    commonPage = new CommonPage();
    planningPage = new PlanningPage();
    planningModal = new PlanningModalPage();
    planningBacklog = new PlanningBacklogPage();
    planningBacklogModal = new PlanningBacklogModalPage();
    releasePage = new ReleasePage();
    configurationPage = new ConfigurationPage();
    newTitle = 'newTitle-' + Date.now();
    newTitle2 = 'newTitle2' + Date.now();
    newString = 'newString-' + Date.now();
    helper.login(orgAdmin.username, orgAdmin.password);
    helper.getUrl(org_url + workspace + 'planning/');
  });

  afterEach(function() {
    helper.logout();
  });

  /************************************************************************************
   *                                                                                  *
   *                               PLANNING BACKLOG                                   *
   *                                                                                  *
   ************************************************************************************/

  it('REQ 3066 + 3067: Should navigate to the backlog page and show the backlog page title', function() {
    planningBacklog.backlogGreenTitle.waitReady();
    expect(planningBacklog.backlogGreenTitle.getText()).toBe('BACKLOG');
    expect(browser.getCurrentUrl()).toEqual(org_url + workspace + 'planning/');
  });

  /************************************************************************************
   *                                                                                  *
   *                                  BACKLOG                                         *
   *                                                                                  *
   ************************************************************************************/

  describe('Planning Backlog:', function() {

    beforeEach(function() {
      planningBacklogModal.addStoryOnlyTitle(newTitle);
      expect(planningBacklog.storyIsCreatedAndPresentBacklog(newTitle)).toBeTruthy();
    });

    afterEach(function() {
      planningBacklog.clearBacklog();
    });

    describe('REQ 3077: Should be able to sort stories by clicking on the column heading', function() {

      beforeEach(function() {
        planningBacklog.clearBacklog();
        planningBacklogModal.addStory('a', 'Bug', '1', 'Critical');
        planningBacklog.storyIsCreatedAndPresentBacklog('a');
        planningBacklogModal.addStory('b', 'Story', '3', 'Low');
        planningBacklog.storyIsCreatedAndPresentBacklog('b');
      });

      it('Should be able to sort stories by SlugId', function() {
        planningBacklog.userStoryColumn.click();
      });

      it('Should be able to sort stories by Title', function() {

      });

      xit('Should be able to sort stories by Score', function() {//score not implemented yet

      });

      it('Should be able to sort stories by Type', function() {

      });

      it('Should be able to sort stories by Priority', function() {

      });

      it('Should be able to sort stories by Status', function() {

      });

      it('Should be able to sort stories by Points', function() {

      });

    });

    it('REQ 1933: Should display: ID, Title, Score, Type, Priority, Status, and Points in the backlog', function() {
      expect(browser.isElementPresent(planningBacklog.userStoryColumn)).toBeTruthy();
      expect(browser.isElementPresent(planningBacklog.titleColumn)).toBeTruthy();
      expect(browser.isElementPresent(planningBacklog.scoreColumn)).toBeTruthy();
      expect(browser.isElementPresent(planningBacklog.typeColumn)).toBeTruthy();
      expect(browser.isElementPresent(planningBacklog.priorityColumn)).toBeTruthy();
      expect(browser.isElementPresent(planningBacklog.statusColumn)).toBeTruthy();
      expect(browser.isElementPresent(planningBacklog.pointsColumn)).toBeTruthy();
    });

  });

  // it('REQ 3099: Should be able to customize the columns shown on the backlog', function() {
  //
  // });
  //
  // it('REQ 3068: Should be able to select backlog for a product', function() {
  //
  // });
  //
  // it('REQ 3100: Should be able to import backlog items', function() {
  //
  // });
  //
  // it('REQ 3085: Should be able to add a sprint', function() {
  //
  // });
  //
  // it('REQ 3084: Should be able to view the sprint count', function() {
  //
  // });
  //
  // it('REQ 3124: Should be able to see story totals for the sprint', function() {
  //
  // });
  //
  // it('REQ 3086: Should see selected sprints', function() {
  //
  // });
  //
  // it('REQ 3069: Should be able to keyword search the backlog', function() {
  //
  // });
  //
  // it('REQ 3094: Should be able to select a saved filter', function() {
  //
  // });
  //
  // it('REQ 3087: Should be able to show/hide sprint details', function() {
  //
  // });
  //
  // it('REQ 3078/3122: Should be able to rank/move stories in the backlog', function() {
  //
  // });
  //
  // it('REQ 3126: Should be able to see stories assigned to a sprint', function() {
  //
  // });
  //
  // it('REQ 3128: Should be able to batch update points in the backlog', function() {
  //
  // });
  //
  // it('REQ 3081: Should be able to move stories to a sprint', function() {
  //
  // });
  //
  // it('REQ 3127: Should be able to move stories within a sprint', function() {
  //
  // });
  //
  // it('REQ 3073: Should be able to see backlog points', function() {
  //
  // });
  //
  // it('REQ 3092: Should be to select all items for a bulk update', function() {
  //
  // });
  //
  // it('REQ 2970: Should be able to bulk update stories with a tag', function() {
  //   planningPage.addStoryBacklog.waitReady();
  //   planningPage.addStoryBacklog.click();
  //   planningModal.title.waitReady();
  //   planningModal.title.sendKeys(newTitle);
  //   planningModal.save_button.click();
  //   expect(planningPage.storyIsCreatedAndPresentBacklog()).toBeTruthy();
  //   planningPage.addStoryBacklog.waitReady();
  //   planningPage.addStoryBacklog.click();
  //   planningModal.title.waitReady();
  //   planningModal.title.sendKeys(newTitle2);
  //   planningModal.save_button.click();
  //   expect(planningPage.storyIsCreatedAndPresentBacklog()).toBeTruthy();
  //   planningPage.selectAllStories.click();
  //   planningPage.bulkUpdateTag.waitReady();
  //   planningPage.bulkUpdateTag.click();
  //   planningPage.bulkUpdateTagBox.waitReady();
  //   planningPage.bulkUpdateTagBox.click();
  //   planningPage.bulkUpdateTagBox.sendKeys('BULKTAG');
  //   browser.actions().sendKeys(protractor.Key.ENTER).perform();
  //   browser.sleep(2000);//wait for bulk update to save
  //   planningPage.storyRowsBacklog.get(0).click();
  //   planningPage.splitViewTitle.waitReady();
  //   expect(planningPage.splitViewTag.getText()).toBe('BULKTAG');
  //   planningPage.storyRowsBacklog.get(1).click();
  //   planningPage.splitViewTitle.waitReady();
  //   expect(planningPage.splitViewTag.getText()).toBe('BULKTAG');
  //   helper.getUrl(org_url + workspace + 'admin/configuration/general/');
  //   configurationPage.deleteTag();
  //   menuPage.planning_menuItem.click();
  //   helper.getUrl(org_url + workspace + 'planning/');
  //   planningPage.addStoryBacklog.waitReady();
  // });
  //
  // it('REQ 3074: Should be able to see committed points', function() {
  //
  // });
  //
  // it('REQ 3076: Should see number of completed points', function() {
  //
  // });
  //
  // it('REQ 3070: Should see the backlog progress bar', function() {
  //
  // });
  //
  // it('REQ 3125: Should see the sprint metric/bar', function() {
  //
  // });
  //
  // it('REQ 3072: Should see the backlog item count', function() {
  //
  // });
  //
  // it('REQ 3075: Should be able to view number of "discovered" stories', function() {
  //
  // });

});

