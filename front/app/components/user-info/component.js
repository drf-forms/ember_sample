import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  right: false,
  login: null,
  password: null,
  
  authenticateAction: 'authenticate',
  invalidateAction: 'invalidate',
  
  actions: {
    authenticate() {
      var credentials = {
        identification: this.get('login'),
        password: this.get('password')
      };
      this.sendAction('authenticateAction', credentials);
    },
    invalidate() {
      this.sendAction('invalidateAction');
    }
  }
});
