import Cookies from 'ember-cli-js-cookie';

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

export function initialize(/* application */) {
  // just in case someone wants to use window.$
  // instead of fetch
  if (window.$) {
    let csrftoken = Cookies.get('csrftoken');
    window.$.ajaxSetup({
      beforeSend(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
                              
        }
      },
      complete(/* xhr, status */) {
        const tmp_csrftoken = Cookies.get('csrftoken');
        if (tmp_csrftoken !== undefined && tmp_csrftoken.length) {
          csrftoken = tmp_csrftoken;
        }
        const tmp_sessionid = Cookies.get('sessionid');
        if (tmp_sessionid !== undefined && tmp_sessionid) {
          Cookies.set('sessionid', tmp_sessionid);
        }
      }
    });
  }
}

export default {
  name: 'django',
  initialize
};
