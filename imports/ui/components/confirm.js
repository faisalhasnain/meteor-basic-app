import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';

import './confirm.html';

Template.confirm.events({
  'click .js-yes'(event, templateInstance) {
    Blaze.remove(templateInstance.view);
    templateInstance.data.resolve(true);
  },
  'click .js-no'(event, templateInstance) {
    Blaze.remove(templateInstance.view);
    templateInstance.data.resolve(false);
  },
});

export const showConfirm = data => new Promise((resolve) => {
  Blaze.renderWithData(Template.confirm, { resolve, ...data }, document.body);
});

