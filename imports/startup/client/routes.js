import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/user-layout.js';
import '../../ui/layouts/guest-layout.js';

import '../../ui/pages/transactions.js';


FlowRouter.route('/', {
  name: 'transactions',
  action() {
    BlazeLayout.render('userLayout', { page: 'listTransactions' });
  }
});
