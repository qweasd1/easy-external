# easy-external
install npm package and spawn process easily from code

## Install
```bash
// yarn
yarn add easy-external

// npm
npm install --save easy-external
```

## Usage

```javascript
const createRunner =  require('easy-external');

// create a Runner 
// 'cwd'(required) is the current working directory for your runner
let runner = createRunner({
  cwd:process.cwd()
})

// use .installPackagesSync(packages,isSaveDev) to install npm package
// if yarn is installed, it will use yarn to install the package, otherwise npm is used
runner.installPackagesSync(["react","redux@3.7.2"])
runner.installPackagesSync(["gulp"],true)

// use .removePackagesSync(packages,isSaveDev) to remove npm package
// if yarn is used, you don't need to specify the second parameter, yarn will choose it for you
runner.removePackagesSync(["react","redux@3.7.2"])
runner.removePackagesSync(["gulp"],true)

// use.runSync(cmd,args,options) to run a child process, this is just a wrapper for child_precess.spawnSync, we just set the default cwd to your runner's cwd, you can override it on options 
runner.runSync("/bin/bash","list")

// There is a result from .installPackagesSync(...), .removePackagesSync(...)
let result = runner.installPackagesSync(["react"])

// if the child process return 0, result will be 'null'
// else, result will be {error:"errorMessage...",raw:[Object]}, the 'raw' is the result return from child_process.spawnSync, the 'error' message is from the stderr on the child_process.
// use this result to check whether you install your node package successfully



```