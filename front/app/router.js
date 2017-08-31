import Ember from 'ember';
import config from './config/environment';
import sections from './sections';

const Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  sections.forEach((section) => {
    if (section.route !== 'djember') {
      const opts = section.opts || {};
      this.route(section.route, opts);
    }
  });
  this.route('login');
  this.route('logout');

  this.route('djember', function() {
    this.route('app', {path: '/:app_name'});
    this.route('list', {path: '/:app_name/:model_name'});
    this.route('form', {path: '/:app_name/:model_name/:id'});
  });
});
