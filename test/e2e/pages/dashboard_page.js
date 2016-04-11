'use strict';

/* global describe, beforeEach, afterEach, it, browser, expect, element, by */

module.exports = function() {
    this.workspace_title =
      element(by.cssContainingText('.caption-subject.font-blue-madison.bold.uppercase', 'My Workspaces'));
};
