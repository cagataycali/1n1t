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

function questions() {
  return new Promise(function(resolve, reject) {
    q(content)
      .then((value) => {
        resolve(output.url)
      })
      .catch((err) => {reject(err);})
  });
}

function check() {
  return new Promise(function(resolve, reject) {
    B()
      .then((value) => {console.log(colors.red('Git already initialized.'));})
      .catch((err) => {
        questions()
         .then((url) => {
           E(`git init && git remote add origin ${url.trim()}`)
            .then((value) => {
              resolve('Git init successfully.')
            })
            .catch((err) => {reject(err)})
         })
      })
  })
}

module.exports = function run() {
  return new Promise(function(resolve, reject) {
  check()
    .then((value) => {
      resolve(value)
    })
    .catch((err) => {
      reject(err)
    })
  })
}
