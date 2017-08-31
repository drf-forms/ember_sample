import Ember from 'ember';
import config from '../config/environment';
import SessionService from 'ember-simple-auth/services/session';
import fetch from 'ember-network/fetch';
import Cookies from 'ember-cli-js-cookie';

const { observer } = Ember;

export default SessionService.extend({
  currentUser: null,
  loginError: false,
  setCurrentUser: observer('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      const globalConfig = config['ember-simple-auth'] || {};
      const serverAuthEndpoint = globalConfig.serverAuthEndpoint || '/rest-auth';
      const url = `${serverAuthEndpoint}/me/?format=json`;
      if (window.$ !== undefined) {
        window.$.get(url, (xhr) => {
          this.set('currentUser', xhr);
        }).fail(() => {
          this.set('isAuthenticated', false);
        });
      } else {
        const params = {
          headers: {
            "X-CSRFToken": Cookies.get('csrftoken'),
            "Content-Type": 'application/json',
            "Accept": 'application/json',
          }
        };
        fetch(url, params).then((response) => {
          return response.json();
        }, () => {
          this.set('isAuthenticated', false);
        }).then((json) => {
          this.set('currentUser', json);
        }, () => {
          console.log('failed parsing reponse for current user');
          this.set('isAuthenticated', false);
        });
      }
    } else {
      this.set('currentUser', '');
    }
  })
});

