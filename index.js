var B = require('br4nch');
var E = require('3x3c');
var async = require('async');
var inquirer = require('inquirer');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();
var cmdify = require('cmdify');

var loader = [
  '/ Installing.',
  '| Installing..',
  '\\ Installing...',
  '- Installing..'
];
var i = 4;
var ui = new inquirer.ui.BottomBar({bottomBar: loader[i % 4]});

setInterval(function () {
  ui.updateBottomBar(loader[i++ % 4]);
}, 300);

module.exports = function() {
  return new Promise(function (resolve, reject) {
    B()
      .then((value) => {resolve(value)})
      .catch((err) => {

        var questions = [
          {
            type: 'input',
            name: 'url',
            message: 'What\'s your git repository url?'
          }
        ];

        inquirer.prompt(questions).then(function (answers) {
          E(`git init && git remote add origin ${answers.url} && git remote show origin && git symbolic-ref HEAD && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
              .then((value) => {
                B()
                  .then((out) => {ui.updateBottomBar('Init done!\n');resolve(out)})
                  .catch((err) => {ui.updateBottomBar('Init error!\n', err);reject(err)})
              })
              .catch((err) => {ui.updateBottomBar('Init error!\n', err);reject(err)});
        });
      });
  })
}
