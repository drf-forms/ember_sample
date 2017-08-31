import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
import fetch from 'ember-network/fetch';
import Cookies from 'ember-cli-js-cookie';


function isSecureUrl(url) {
  var link  = document.createElement('a');
  link.href = url;
  link.href = link.href;
  return link.protocol === 'https:';
}

export default Base.extend({

  init() {
    var globalConfig = config['ember-simple-auth'] || {};
    this.serverAuthEndpoint = globalConfig.serverAuthEndpoint || '/rest-auth';
  },

  authenticate(credentials) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const data = { username: credentials.identification, password: credentials.password };
      this.makeRequest(`${this.serverAuthEndpoint}/login/`, data).then((response) => {
        Ember.run(() => {
          resolve(response);
        });
      }, (xhr /*, status, error */) => {
        Ember.run(() => {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.makeRequest(`${this.serverAuthEndpoint}/me/`, null, 'GET').then((/* response */) => {
        resolve(data);
      }, (/* xhr , status, error */) => {
        reject();
        this.invalidate();
      });
    });
  },

  invalidate(/* data */) {
    function success(resolve) {
      resolve();
    }
    return new Ember.RSVP.Promise((resolve /*, reject */) => {
      this.makeRequest(`${this.serverAuthEndpoint}/logout/`, {}).then((/* response */) => {
        Ember.run(() => {
          success(resolve);
        });
      }, (/* xhr, status, error */) => {
        Ember.run(() => {
          success(resolve);
        });
      });
    });
  },


  makeRequest(url, data, method) {
    if (!isSecureUrl(url)) {
      Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
    }
    if (method === undefined) {
      method = 'POST';
    }
    const params = {
      method: method,
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      }
    };
    if (method === 'POST') {
      params['body'] = JSON.stringify(data);
    } else if (method === 'GET' && window.$ !== undefined) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        window.$.get(url, (xhr) => {
          resolve(xhr);
        }).fail(() => {
          reject();
        });
      });
    }

    return new Ember.RSVP.Promise((resolve, reject) => {
      fetch(`${url}?format=json`, params).then((response) => {
        if (response.status === 400) {
          response.json().then((json) => {
            reject(json);
          });

        } else if (response.status > 400) {
          reject(response);
        } else {
          resolve(response);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },
});
