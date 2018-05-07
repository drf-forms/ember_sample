import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  modelLoader: Ember.inject.service(),

  items: [],

  last_update: undefined,
  set_updated() {
    this.set('last_update', new Date());
  },

  append(product, qty) {
    qty = parseInt(qty);
    this.get('store').query('basketitem', {filter: { product: product.get('id') }})
      .then((items) => {
        let item = items.get('firstObject');
        if (item) {
          item.set('qty', item.get('qty') + qty);
        } else {
          item = this.get('store').createRecord('basketitem', {
            product,
            qty
          });
        }
        item.save();
        this.set_updated();
      }, (err) => {
        console.error(err);
      });
  },

  count: Ember.computed('last_update', 'items.@each.qty', 'items.length', 'items', function() {
    return this.get('items').reduce(function(sum, item) {
      return sum + parseInt(item.get('qty'));
    }, 0);
  }),

  init() {
    const modelLoader = this.get('modelLoader');
    modelLoader.ensure_model('products', 'product').then(() => {
      this.get('store').findAll('basketitem').then((items) => {
        items.map((item) => {
          item.get('product');
          // .catch((err) => {
          //   console.warn(err, 'destroying', item);
          //   item.destroyRecord();
          // });
        });
        this.set('items', items);
        this.set_updated();
      });
    });
  }
});
