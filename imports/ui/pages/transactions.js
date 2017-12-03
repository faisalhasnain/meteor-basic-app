import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Transactions } from '/imports/api/transactions/collection';
import { showConfirm } from '/imports/ui/components/confirm.js';
import './transactions.html';

Template.transactions.onCreated(function () {
  this.subscribe('transactions', {});
});

Template.transactions.helpers({
  transactions() {
    return Transactions.find({}, { sort: { createdAt: -1 } });
  }
});

Template.transactions.events({
  'click .js-delete': async (event, templateInstance) => {
    event.preventDefault();
    const { transaction } = templateInstance.data;
    const ans = await showConfirm({
      title: 'Confirm Delete?',
      message: `Do you really want to delete ${transaction.title} from transactions?`
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
