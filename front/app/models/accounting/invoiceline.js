import Ember from 'ember';
import BaseModel from '../base/accounting/invoiceline';

export default BaseModel.extend({
  total: Ember.computed('quantity', 'product', 'product.price', function() {
    return parseInt(this.get('quantity') || 0) * parseFloat(this.get('product.price') || 0.0);
  }),
});

