'use strict';

var WorkspaceRolesPage = function() {

  this.adminColumn = element.all(by.repeater('role in adminRole.roles').column('role.name'));

  this.clickRole = function(role) {
    this.adminColumn.filter(function(elem) {
      return elem.getText().then(function(text) {
        return text === role;
      });
    }).click();
  };

};

module.exports = WorkspaceRolesPage;
