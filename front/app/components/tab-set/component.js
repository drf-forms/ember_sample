import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    if (this.attrs.active === undefined) {
      const tabs = this.get('tabs');
      if (tabs && tabs.length > 0) {
        this.set('active', tabs[0].id);
      }
    }
  },

  actions: {
    switchTo(newActive) {
      this.set('active', newActive);
    }
  }
});
