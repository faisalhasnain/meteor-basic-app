import SimpleSchema from 'simpl-schema';

const BaseSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    denyUpdate: true
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  createdBy: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    autoValue: function(value) {
      if (this.isInsert) {
        return this.userId || this.value; // to allow custom value for seed data
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      } else {
        this.unset();
      }
    }
  },
  updatedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    denyInsert: true,
    autoValue: function () {
      if (this.isUpdate) {
        return this.userId;
      } else {
        this.unset();
      }
    }
  }
});

export default BaseSchema;
