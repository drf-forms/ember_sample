import BaseModel from '../base/accounting/invoice';

export default BaseModel.extend({
  total: 0,
  onLinesChange: function() {
    this.get('lines').then((lines) => {
      let total = 0;
      lines.map((line) => {
        total += line.get('total');
      });
      this.set('total', total);
    });
  }.observes('lines', 'lines.length', 'lines.@each.total'),

  open() {
    this.set('state', 'open');
    return this.save();
  },
  makeDraft() {
    this.set('state', 'draft');
    return this.save();
  },
});
