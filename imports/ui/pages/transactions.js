import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Transactions } from '/imports/api/transactions/collection';
import { showConfirm } from '/imports/ui/components/confirm.js';
import './transactions.html';

Template.listTransactions.onCreated(function () {
  this.subscribe('transactions', {});
});

Template.listTransactions.helpers({
  transactions() {
    return Transactions.find({}, {
      sort: { createdAt: -1 },
      transform(transaction) {
        return {
          createdAt: transaction.createdAt.toLocaleString(),
          description: transaction.description,
          debit: transaction.type === 'Debit',
          credit: transaction.type === 'Credit',
          amount: transaction.amount.toLocaleString()
        };
      }
    });
  },
  balance() {
    if (!Meteor.user()) return;
    const credits = Transactions.find({ type: 'Credit' }, { fields: { amount: 1 } }).fetch().map(t => t.amount)
      .reduce((total, val) => total + val, 0);
    const debits = Transactions.find({ type: 'Debit' }, { fields: { amount: 1 } }).fetch().map(t => t.amount)
      .reduce((total, val) => total + val, 0);
    const balance = credits - debits;
    return `${balance.toLocaleString()} ${Meteor.user().profile.currency}`;
  }
});

Template.viewTransaction.events({
  'click .js-delete': async (event, templateInstance) => {
    event.preventDefault();
    const { transaction } = templateInstance.data;
    const ans = await showConfirm({
      title: 'Confirm Delete?',
      message: `Do you really want to delete ${transaction.description} from transactions?`
    });
    if (!ans) return;
    try {
      const removed = await Meteor.callAsync('Transactions.remove', transaction._id);
      console.log('Transaction Deleted', removed);
    } catch (error) {
      console.error(error);
    }
  }
});

Template.insertTransaction.events({
  'submit .js-transaction-form': async (event) => {
    console.log(event);
    event.preventDefault();
    const transaction = {
      description: event.target.description.value,
      type: event.target.type.value,
      amount: Number(event.target.amount.value),
    };
    try {
      console.log(transaction);
      const id = await Meteor.callAsync('Transactions.insert', transaction);
      console.log('Transaction Added', id);
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  }
});
