import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  qty: attr('number'),
  product: belongsTo('products/product', {
    async: true,
    inverse: null
  }),
  total: Ember.computed('qty', 'product', 'product.price', function() {
    return parseInt(this.get('qty')) * parseFloat(this.get('product.price'));
  }),
  __str__: Ember.computed('product', 'product.name', 'qty', function() {
    return `${this.get('qty')} x ${this.get('product.name')}`;
  }),
});
