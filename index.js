var B = require('br4nch');
var E = require('3x3c');
var async = require('async');

module.exports = function() {
  B()
    .then((value) => {return value})
    .catch((err) => {

      console.log('Not a git repository (or any of the parent directories): .git');

      var prompt = require('prompt');
      prompt.start();
      prompt.get([{name:'url', required: true, description: "Git remote url: Ex. https://github.com/cagataycali/br4anch.git"}], function (err, result) {
        E(`git init && git remote add origin ${result.url} && git remote show origin && git symbolic-ref HEAD`)
          .then((value) => {return value.split('/').pop(-1);})
          .catch((err) => {return err});
      });
    });
}
