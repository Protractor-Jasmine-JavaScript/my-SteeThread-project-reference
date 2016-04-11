/**
 * Created by justin on 3/20/15.
 */

module.exports = function() {

  this.taglineTable = element(by.id('Tagline'));

  this.deleteWorkspaceTable = function(rowNum) {
    element(by.repeater('workspace in workspaceTable.workspaces').row(rowNum)).
      element(by.model('workspaceTable.checkboxes.items[workspace.id]')).click();
    element(by.css('button.btn.btn-sm.btn-default.dropdown-toggle.tooltips')).click();
    element(by.id('deleteSelected')).click();
    element(by.css('button.btn.btn-danger.ng-binding')).click();
    browser.sleep(500);
  };

  this.deleteAllWorkspacesTable = function() {
    element(by.model('workspaceTable.checkboxes.checked')).click();
    element(by.css('button.btn.btn-link')).click();
    element(by.id('deleteSelected')).click();
    element(by.css('button.btn.btn-danger.ng-binding')).click();
    browser.sleep(500);
  };

  this.clickRow = function(rowNum) {
    element.all(by.repeater('workspace in workspaceTable.workspaces')).then(function(rows) {
      rows[rowNum].click();
    });
  };

  this.deleteWorkspace = function(rowNum) {
    //element(by.repeater('workspace in workspaceTable.workspaces').row(0)).element(by.model('workspaceTable.checkboxes.items[workspace.id]')).click();
    var ws = element(by.repeater('workspace in workspaceTable.workspaces').row(rowNum)); //this.getWs(wsName); //
    var wsTitle = ws.element(by.css('a[ui-sref="org.workspace.home({wsSlugId: workspace.slugId})"]')).getText();
    if (wsTitle != 'Test- WS ENV') {
      ws.element(by.model('workspaceTable.checkboxes.items[workspace.id]')).click();
      element(by.css('button.btn.btn-link')).click();
      browser.sleep(500);//wait for animation to finish
      element(by.css('#deleteSelected')).click();
      browser.sleep(500);//wait for animation to finish
      element(by.css('button.btn.btn-danger.ng-binding')).click();
    } else {
      console.log('ERROR: Tried to delete old workspace');
    }
    browser.sleep(500);
  };

  this.getWorkspaceByTitle = function(title) {
    return element.all(by.repeater('workspace in workspaceTable.workspaces')).filter(function(elem) {
      return elem.evaluate('workspace.slugId').then(function(text) {
        return text === title;
      });
    }).then(function(filtered) {
      return (filtered.length > 0) ? filtered[0] : null;
    });
  };

  this.deleteAllWorkspaceBut = function(WS_ID) {
    this.getWorkspaceByTitle(WS_ID).then(function(ws) {
      element(by.model('workspaceTable.checkboxes.checked')).click();
      ws.element(by.model('workspaceTable.checkboxes.items[workspace.id]')).click();
      browser.isElementPresent(element(by.
      css('[message="Are you sure you want to delete the selected workspaces?"]'))).then(function(bool) {
        if (bool === true) {
          element(by.css('.fa.fa-cog.st-controls')).click();
          element(by.css('.fa.fa-trash-o.text-muted')).click();
          element(by.css('.btn.btn-danger.ng-binding')).click();
          console.log('Cleaned up extra workspaces :)');
        }else {
          console.log('No extra workspace to delete :(');
        }
      });

    })};

};
