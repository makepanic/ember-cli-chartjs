'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // fix lazy chunk loading, see https://github.com/ef4/ember-auto-import/issues/133#issuecomment-437645242
    autoImport: {
      webpack: {
        optimization: {
          splitChunks: {
            chunks: 'async'
          }
        }
      }
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
