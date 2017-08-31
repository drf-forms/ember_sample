import { moduleForModel, test } from 'ember-qunit';

moduleForModel('accounting/invoiceline', 'Unit | Model | accounting/invoiceline', {
  // Specify the other units that are required for this test.
  needs: ['model:accounting/invoice', 'model:products/product', ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

