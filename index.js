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

var contentFirst = [
  {
    type: 'confirm',
    name: 'commitWithInit',
    message: 'Would you want commit and initial push with init?',
    default: true
  },
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
];

var contentSecond = [
  {
    type: 'input',
    name: 'message',
    message: 'What\'s your awesome hello new repo commit?',
    validate: function (value) {
      if (value.trim().length > 0) {
        return true;
      }

      return 'Please write down your best comments...';
    }
  }
];

function questions() {
  return new Promise(function(resolve, reject) {
    q(contentFirst)
      .then((output) => {
        if (output.commitWithInit) {
          q(contentSecond)
            .then((value) => {
              var obj = {
                message: value.message,
                url: output.url,
                new: true,
              }
              resolve(obj)
            })
            .catch((err) => {reject(err);})
        } else {
          var obj = {
            message: 'Awesome repository initialized with g3l.',
            url: output.url,
            new: true,
          }
          resolve(obj)
        }
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
         .then((obj) => {
           E(`git init && git remote add origin ${obj.url.trim()}`)
            .then((value) => {
              console.log(colors.green('Git init successfully.'));
              C(obj)
               .then((value) => {
                 console.log(value);
                 resolve(obj)
               })
               .catch((err) => {
                 console.log(err);
                 reject(value)
               })
            })
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
