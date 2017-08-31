import Base from 'ember-simple-auth/authorizers/base';
import Cookies from 'ember-cli-js-cookie';

export default Base.extend({
  authorize(sessionData, block) {
    const csrftoken = Cookies.get('csrftoken');
    block('X-CSRFToken', csrftoken);
  }
});
