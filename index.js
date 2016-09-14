var async = require('async');
var E = require('3x3c');
var B = require('br4nch');
var C = require('c0mm1t');
var colors = require('colors');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
var emoji = require('node-emoji');
var inquirer = require('inquirer');
var isGitUrl = require('is-git-url');
updateNotifier({pkg}).notify();

function q(content) {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(content)
      .then((outputs) => {
        resolve(outputs);
      }).catch((err) => {reject(err)})
  });
}

var content = [
  {
    type: 'input',
    name: 'url',
    message: 'What\'s your git url?',
    validate: function (value) {
      if (isGitUrl(value)) {
        return true;
      }
      return 'Please enter a git url.';
    }
  }
]

module.exports = function run() {
  return new Promise(function(resolve, reject) {
    B()
      .then((value) => {console.log(colors.red('Git already initialized.'));})
      .catch((err) => {
        q(content)
          .then((value) => {
            E(`git init && git remote add origin ${value.url.trim()}`)
             .then((value) => {
               resolve('Git init successfully.')
             })
          })
          .catch((err) => {reject(err);})
         })
      })
}
