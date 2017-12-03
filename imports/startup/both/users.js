import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseSchema from '/imports/utils/base-schema.js';

const profileSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  currency: {
    type: String
  }
});

const userSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    minCount: 1,
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  profile: {
    type: profileSchema,
  },
  groups: {
    type: Array,
    optional: true
  },
  'groups.$': {
    type: Object
  },
  'groups.$.id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  'groups.$.joinedAt': {
    type: Date
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ['admin'], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  // roles: {
  //     type: Object,
  //     optional: true,
  //     blackbox: true
  // },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  roles: {
    type: Array,
    optional: true
  },
  'roles.$': {
    type: String
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
}).extend(BaseSchema);

// Deny all client-side updates to user documents
Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Meteor.users.attachSchema(userSchema);
