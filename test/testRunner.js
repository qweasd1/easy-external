/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Runner = require('../lib/Runner');
const path = require('path');

let r = new Runner({
  cwd:path.resolve(process.cwd(),"..")
})

r.installAll()

// console.log(r.installPackages(["react","redux"],true));
// console.log(r.removePackages(["react","redux"],true));
