import Ember from 'ember';
import RecordLine from 'ember-cli-crudities/components/record-line';

export default RecordLine.extend({
  classNames: ['col-xs-12 col-sm-6 col-lg-4'],
  tagName: 'div',
  qty: 1,

  cart: Ember.inject.service(),

  addToCart(model/*, act */) {
    console.log(`Adding ${this.get('qty')} x ${model.get('name')} to cart`);
    const cart = this.get('cart');
    cart.append(model, this.get('qty'));
  }
});
