### angular-e2e-exercise
Solution for https://gist.github.com/bratchenko/990f024e11fd09e6b6bf

### Install dependenices

Please make sure you have python, pip, node, and npm installed.

```
pip install Flask
npm install
bower install
```

Launch the b/e:
```
python backend.py
```

Lanuch the f/e:
```
grunt serve
```

Or build it using:
```
grunt build
```
and run index.html found in dist/

Run unit tests:
```
grunt test
```

Run e2e tests:
```
webdriver-manager start
protractor test/scenarios/conf.js
```