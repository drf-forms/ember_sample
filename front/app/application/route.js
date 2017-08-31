import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import sections from '../sections';

export default Ember.Route.extend(ApplicationRouteMixin, {
  authenticator: 'authenticator:django',
  model() {
    return sections;
  },
  actions: {
    authenticate(credentials) {
      const session = this.get('session');
      if (credentials.identification && credentials.password) {
        session.authenticate(this.get('authenticator'), credentials).then(() => {
          session.set('loginError', false);
        }, () => {
          session.set('loginError', "Invalid credentials. Please retry.");
        });
      }
    },
    invalidate() {
      this.get('session').invalidate();
    }
  }
});
