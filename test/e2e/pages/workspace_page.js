/**
 */

var workspacePage = function() {
  this.saveButton = element(by.buttonText('Save'));
  this.addWorkspaceButton = element(by.buttonText('Add'));
  this.addWorkspaceTitle = element(by.model(''));
  this.addWorkspaceDescription = element(by.model(''));
  this.addWorkspaceTagline = element();
  this.addWorkspaceOwner = element();

  this.addWorkspace = function(title) {
    this.addWorkspaceButton.click();
    this.addWorkspaceTitle.sendKeys(title);
    this.saveButton.click();
  }
};

module.exports = workspacePage;
