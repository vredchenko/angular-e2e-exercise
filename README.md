### angular-e2e-exercise
Solution for https://gist.github.com/bratchenko/990f024e11fd09e6b6bf

### Install dependenices

Please make sure you have python, pip, node, and nvm installed.

npm install
bower install

Launch the b/e liek so:

```
python backend.py
```

Lanuch the f/e like so:

```
grunt serve
```

Or build it using:

```
grunt build
```

and run index.html found in dist/

Run unit tests like so:

```
webdriver-manager start
grunt test
```

Run e2e tests like so:

```
protractor test/spec/scenarios/conf.js
```