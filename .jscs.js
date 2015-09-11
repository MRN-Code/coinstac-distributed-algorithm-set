var Checker = require("jscs");
var glob = require("glob");
var fs = require('fs');
var checker = new Checker();
var failed; // indicates how process should exit
checker.registerDefaultRules();
checker.configure(JSON.parse(fs.readFileSync('.jscsrc', {encoding: 'utf8'})));

glob("./lib/**/*.js", {}, function (er, files) {
    files.push('./index.js');
    files.forEach(function(path) {
        console.log('checking file: ', path);
        var results = checker.checkString(fs.readFileSync(path, {encoding: 'utf8'}));
        results.getErrorList().forEach(function(error) {
            failed = true;
            var colorizeOutput = true;
            console.log(results.explainError(error, colorizeOutput) + "\n");
        });
        if (failed) {
            process.exit(1);
        }
    });
});
