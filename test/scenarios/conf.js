exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub'
, specs: ['e2e.spec.js']

// Spec patterns are relative to the location of the spec file. They may
// include glob patterns.
, suites: {
    main: 'e2e.spec.js'
    // Additional scenarios to go here
  }

  // Options to be passed to Jasmine-node.
, jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }

// , capabilites: {
//     browserName: 'chrome'
//   }

// , plugins: [{
//     path: 'node_modules/protractor/plugins/accessibility',
//     chromeA11YDevTools: {
//       treatWarningsAsFAilures: false
//     }
//   }]

};