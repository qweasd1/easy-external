/**
 * Created by tony on 7/16/17.
 */
'use strict'

const child_process = require('child_process');
const spawnSync = child_process.spawnSync
const execSync = child_process.execSync


let _isYarnInstalled

function isYarnInstalled() {
  
  if (typeof _isYarnInstalled !== "undefined") {
    return _isYarnInstalled
  }
  
  try {
    execSync("yarn -v")
    _isYarnInstalled = true
  }
  catch (e) {
    _isYarnInstalled = false
  }
  
  return _isYarnInstalled
  
}

class Runner {
  
  constructor({
    cwd
  }) {
    this.cwd = cwd
  }
  
  installAll(){
    let result
    if (isYarnInstalled()) {
      result = spawnSync("yarn",["install"],{
        cwd:this.cwd
      })
    }
    else {
      result = spawnSync("npm",["install"],{
        cwd:this.cwd
      })
    }
  
    if (result.status === 0) {
      return null
    }
    else {
      return {
        error:result.stderr.toString(),
        raw:result
      }
    }
  }
  installPackages(packageNames, isSaveDev = false) {
    let result
    if (isYarnInstalled()) {
      if (isSaveDev) {
        result = spawnSync("yarn", ["add", "--dev", ...packageNames], {
          cwd:this.cwd
        })
      }
      else {
        result = spawnSync("yarn", ["add", ...packageNames], {cwd:this.cwd})
      }
      
    }
    else {
      if (isSaveDev) {
        result = spawnSync("npm", ["install", "--save-dev", ...packageNames], {cwd:this.cwd})
      }
      else {
        result = spawnSync("npm", ["install", "--save",...packageNames], {cwd:this.cwd})
      }
    }
    
    if (result.status !== 0) {
      return {
        raw: result,
        error: result.stderr.toString()
      }
    }
    else {
      return null
    }
  }
  removePackages(packageNames, isSaveDev=false){
    let result
    if (isYarnInstalled()) {
      for (let pkg of packageNames) {
        result = spawnSync("yarn", ["remove",pkg], {cwd:this.cwd})
        if (result.status !== 0) {
          break
        }
      }
    }
    else {
      if (isSaveDev) {
        for (let pkg of packageNames) {
          result = spawnSync("npm", ["uninstall", "--save-dev", pkg], {cwd:this.cwd})
          if (result.status !== 0) {
            break
          }
        }
        
      }
      else {
        for (let pkg of packageNames) {
          result = spawnSync("npm", ["uninstall", "--save",pkg], {cwd:this.cwd})
          if (result.status !== 0) {
            break
          }
        }
      }
      
    }
  
    if (result.status !== 0) {
      return {
        error:result.stderr.toString(),
        raw:result
      }
    }
    else {
      return null
    }
  }
  spawn(cmd, args, options = {}){
    if (!("cwd" in options)) {
      options.cwd = this.cwd
    }
    let result = spawnSync(cmd,args,options)
    return result
  }
}

module.exports = Runner