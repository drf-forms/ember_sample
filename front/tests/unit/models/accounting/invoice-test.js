import { moduleForModel, test } from 'ember-qunit';

moduleForModel('accounting/invoice', 'Unit | Model | accounting/invoice', {
  // Specify the other units that are required for this test.
  needs: ['model:accounting/invoiceline', 'model:crm/company', ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

