import Ember from 'ember';

export default Ember.Route.extend({
  jsons: {
    app: {
      url: '/api/v1/',
      only: ['applications', 'endpoints'],
    },
    fields: {
      url: '/api/v1/crm/companies/',
      only: ['fields']
    },
    list: {
      url: '/api/v1/accounting/invoices/',
      only: ['list_display', 'filter_fields', 'ordering_fields', 'list_editable', 'sortable_by',
        'search_enabled']
    },
    form: {
      url: '/api/v1/crm/companies/',
      only: ['fieldsets']
    },
    actions: {
      url: '/api/v1/accounting/invoices/',
      only: ['custom_actions', 'bulk_actions']
    }
  },

  value: {
    tabs: [
      {
        title: 'does it work?',
        id: 'work',
        emoji: '🌀'
      }, {
        title: 'was it built?',
        id: 'built',
        emoji: '🏫'
      }, {
        title: 'are images uploaded?',
        id: 'images',
        emoji: '📷',
      }
    ],
    active: 'work',
    workTabs: [
      {
        title: 'Application structure',
        id: 'structure',
        emoji: '💿'
      }, {
        title: 'Models',
        id: 'models',
        emoji: '👒'
      }, {
        title: 'Fields information',
        id: 'fields',
        emoji: '🍀'
      }, {
        title: 'List structure',
        id: 'list',
        emoji: '📜'
      }, {
        title: 'Form structure',
        id: 'form',
        emoji: '📝'
      }, {
        title: 'Actions',
        id: 'actions',
        emoji: '🎬'
      // }, {
      //   title: 'Translatable fields',
      //   id: 'translation',
      //   emoji: '🏳'
      // }, {
      //   title: 'Conditional display',
      //   id: 'condition',
      //   emoji: '❓'
      }
    ],
    builtTabs: [
      {
        title: 'Bootstrapping the application',
        id: 'bootstrap',
        emoji: '👢'
      }, {
        title: 'On the backend',
        id: 'backend',
        emoji: '🐍',
      }, {
        title: 'On the frontend',
        id: 'frontend',
        emoji: '🐹'
      }
    ],
    jsons:{}
  },

  model() {
    const jsons = this.get('jsons');
    const promises = [];
    let k;
    for (k in jsons) {
      if (!jsons.hasOwnProperty(k)) {
        continue;
      }
      const kk = k;
      const only = jsons[kk].only;
      promises.push(
        new Ember.RSVP.Promise((resolve, reject) => {
          fetch(`${jsons[kk].url}?format=json`, { method: 'OPTIONS' }).then((response) => {
            response.json().then((json) => {
              if (only !== undefined) {
                const rv = {};
                only.forEach((key) => {
                  rv[key] = json[key];
                });
                console.log(kk, rv);
                this.set(`value.jsons.${kk}`, rv);
              } else {
                this.set(`value.jsons.${kk}`, json);
              }
              resolve();
            }, reject);
          }, reject);
        })
      );
    }

    return new Ember.RSVP.Promise((resolve) => {
      Ember.RSVP.allSettled(promises).then(() => {
        resolve(this.get('value'));
      });
    });
  }
});
