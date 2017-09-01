import Ember from 'ember';
import config from '../../config/environment';

const { computed } = Ember;

export default Ember.Component.extend({
  sections: [],
  api_host: computed(() => {
    return config.APP.API_HOST;
  }),
  api_namespace: computed(() => {
    return config.APP.API_NAMESPACE;
  }),
  django_host: computed(() => {
    return `${window.location.protocol}//${window.location.host.split(':')[0]}`;
  })
});
