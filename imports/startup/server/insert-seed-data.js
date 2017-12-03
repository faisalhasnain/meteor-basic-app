import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Transactions } from '/imports/api/transactions/collection';
import { users, transactions } from './seed-data';

Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    console.log('Inserting seed users...');
    users.forEach((user) => {
      Accounts.createUser(user);
    });
    console.log(`Inserted ${users.length} users.`);
  }
  if (Transactions.find().count() === 0) {
    console.log('Inserting seed transactions...');
    const user = Meteor.users.findOne();
    transactions.forEach((transaction) => {
      transaction.createdBy = user._id;
      Transactions.insert(transaction);
    });
    console.log(`Inserted ${transactions.length} transactions.`);
  }
});
