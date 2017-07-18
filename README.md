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

// use .installPackages(packages,isSaveDev) to install npm package
// if yarn is installed, it will use yarn to install the package, otherwise npm is used
runner.installPackages(["react","redux@3.7.2"])
runner.installPackages(["gulp"],true)

// use .removePackages(packages,isSaveDev) to remove npm package
// if yarn is used, you don't need to specify the second parameter, yarn will choose it for you
runner.removePackages(["react","redux@3.7.2"])
runner.removePackages(["gulp"],true)

// use.spawn(cmd,args,options) to run a child process, this is just a wrapper for child_precess.spawnSync, we just set the default cwd to your runner's cwd, you can override it on options
runner.spawn("/bin/bash","list")

// There is a result from .installPackages(...), .removePackages(...)
let result = runner.installPackages(["react"])

// if the child process return 0, result will be 'null'
// else, result will be {error:"errorMessage...",raw:[Object]}, the 'raw' is the result return from child_process.spawnSync, the 'error' message is from the stderr on the child_process.
// use this result to check whether you install your node package successfully

```