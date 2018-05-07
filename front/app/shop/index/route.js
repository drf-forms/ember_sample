import Ember from 'ember';
import ChangeRouteMixin from 'ember-cli-crudities/mixins/change-route';

export default Ember.Route.extend(ChangeRouteMixin, {
  model() {
    return this._super({app_name: 'products', model_name: 'product'});
  }
});
