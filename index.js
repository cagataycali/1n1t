var B = require('br4nch');
var E = require('3x3c');
var async = require('async');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg}).notify();

module.exports = function() {
  return new Promise(function (resolve, reject) {
    B()
      .then((value) => {resolve(value)})
      .catch((err) => {

        console.log('Not a git repository (or any of the parent directories): .git');

        var prompt = require('prompt');
        prompt.start();
        prompt.get([{name:'url', required: true, description: "Git remote url: Ex. https://github.com/cagataycali/br4anch.git"}], function (err, result) {
          E(`git init && git remote add origin ${result.url} && git remote show origin && git symbolic-ref HEAD && echo "# Hi" >> README.md && git add . && git commit -m "Hi" && git push -u origin master`)
            .then((value) => {
              B()
                .then((out) => {resolve(out)})
            })
            .catch((err) => {reject(err)});
        });
      });
  })
}
