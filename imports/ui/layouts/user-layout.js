import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import './user-layout.html';
import './user-layout.css';

Template.userLayout.helpers({
  userFirstName() {
    const user = Meteor.user();
    if (user) {
      return user.profile.firstName;
    }
  }
});

Template.userLayout.events({
  'click #signout'() {
    AccountsTemplates.logout();
  }
});
