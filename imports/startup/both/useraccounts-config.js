import { AccountsTemplates } from 'meteor/useraccounts:core';
import { FlowRouter } from 'meteor/kadira:flow-router';

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

AccountsTemplates.configure({
  hideSignUpLink: true,
  showForgotPasswordLink: true,
  defaultLayout: 'guestLayout',
  onLogoutHook: () => {
    FlowRouter.go('/signin');
  }
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPassword',
  path: '/forgot-password'
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPassword',
  path: '/reset-password'
});
