import Ember from 'ember';

export default Ember.Route.extend({
  modelLoader: Ember.inject.service(),

  model() {
    const modelLoader = this.get('modelLoader');
    return new Ember.RSVP.Promise((resolve, reject) => {
      modelLoader.ensure_model('products', 'category').then(() => {
        resolve({
          model: this.get('store').findAll('basketitem'),
          meta: {
            fields: [
              {
                name: 'qty',
                label: 'Quantity',
                widget: 'number',
                required: true,
              }, {
                name: 'product.name',
                label: 'Product',
              }, {
                name: 'product.price',
                label: 'Unit price',
              }, {
                name: 'total',
                label: 'total',
                widget: 'number',
                extra: {
                  'decimals': 2,
                }
              }
            ],
            list_display: ['qty', 'product.name', 'product.price', 'total'],
            list_editable: ['qty', ],
            aggregates: [
              {
                label: 'Total',
                type: 'sum',
                property_path: 'total',
                decimals: 2
              }
            ]
          }
        });
      }, reject);
    });
  },
  actions: {
    clearbasket() {
      this.get('store').findAll('basketitem').then((records) => {
        records.map((item) => {
          item.destroyRecord();
        });
      });
    }
  }
});
