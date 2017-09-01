import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['active'],
  active: Ember.computed('tabset.active', 'tabId', function() {
    return this.get('tabset.active') === this.get('tabId');
  }),
});
