/**
 * Created by tony on 7/16/17.
 */
'use strict'

const Runner = require('../lib/Runner');

let r = new Runner({
  cwd:"/Users/tony/Documents/projects/web/scaffolding/repo/easy-process"
})

console.log(r.installPackagesSync(["react","redux"],true));
console.log(r.removePackagesSync(["react","redux"],true));
