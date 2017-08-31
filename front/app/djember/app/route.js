import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'djember.index',
  model(params) {
    return params.app_name;
  }
});
