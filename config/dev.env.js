'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_CLIENT_ID: '"855728616663-qt2m9q3k3aveu0rumu1q77b45djnlibd"',
  GAUTH_CLIENT_ID: '"855728616663-bc07bt13h6qrbqospqmt18tahh3ff4mi.apps.googleusercontent.com"'
})
