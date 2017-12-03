import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import BaseSchema from '../../utils/base-schema';

export const Transactions = new Mongo.Collection('transactions');

Transactions.schema = new SimpleSchema({
  description: {
    type: String
  },
  type: {
    type: String,
    allowedValues: ['Debit', 'Credit']
  },
  amount: {
    type: Number
  }
}).extend(BaseSchema);

Transactions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Transactions.attachSchema(Transactions.schema);
