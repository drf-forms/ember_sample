import Ember from 'ember';

export function prettyPrint(params/*, hash*/) {
  return JSON.stringify(params[0], params[1], params[2]);
}

export default Ember.Helper.helper(prettyPrint);
