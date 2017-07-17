/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Runner = require('./lib/Runner');
module.exports = function createRunner(options) {
  return new Runner(options)
}
