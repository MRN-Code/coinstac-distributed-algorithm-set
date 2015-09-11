# coinstac-distributed-algorithm-set

## usage
- clone this repo `git clone git@github.com:MRN-Code/coinstac-distributed-algorithm-set.git`
- cd to the folder and run `npm i` to install js depedencies
- run `node example.js` to exec the script

## debugging
You may find the nodejs debugger useful.  GUI debuggers exist, such as [node-inspector](https://github.com/node-inspector/node-inspector), although it is generally more performant and reliable to use the cmd line debugger. To debug a script, run `npm debug yourScript.js`.  A cheat sheet for the debugger can be [found here](https://nodejs.org/api/debugger.html#debugger_commands_reference).  Remember, to inspect variables, you _must_ enter into the REPL by typing `repl` then `enter`.  `Control+c` to exit the repl and resume navigating your code.

# contributing
Committing will automatically enforce MRN style code.  Please be weary that you may need to reformat some of your code to fall in spec.  If you _don't_ want to do this manually for each file, you simply can run `jscs -x your-file.js` or `jscs -x ./**/*.js` to patch all files.  If jscs is not installed, run `sudo npm i -g jscs`.  Sometimes it will only fix 99% of the errors--you may have to manually adjust some :).
