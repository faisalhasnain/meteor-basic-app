import { Meteor } from 'meteor/meteor';

import { Transactions } from './collection.js';

Meteor.publish('transactions', function (query) {
  return Transactions.find(query);
});
