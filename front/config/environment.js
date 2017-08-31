/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'djember-sample',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      API_NAMESPACE: 'api/v1',
      API_HOST: '',
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };
  
  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:django',
    authenticationRoute: 'login',
    routeAfterAuthentication: 'djember',
    serverAuthEndpoint: '/api/auth'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.serviceWorker = {
      precachedURLs: [
        '/api/*',
      ],
      networkFirstURLs: [
        '/api/*',
      ],
      fastestURLs: [
        '/index.html',
        '/assets/*',
        '',
        'index.html',
        'assets/*',
      ],
    };
    ENV.manifest = {
      enabled: true,
      appcacheFile: "/manifest.appcache",
      excludePaths: ['index.html'],
      includePaths: ['/'],
      network: ['*'],
      showCreateDate: true,
    };
  }

  return ENV;
};
