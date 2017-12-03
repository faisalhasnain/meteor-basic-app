import { Meteor } from 'meteor/meteor';

import { Transactions } from './collection.js';

Meteor.methods({
  'Transactions.insert'(transaction) {
    return Transactions.insert(transaction);
  },
  'Transactions.update'(query, modifier) {
    return Transactions.update(query, modifier);
  },
  'Transactions.remove'(id) {
    return Transactions.remove(id);
  }
});
