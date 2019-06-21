const TestEnv = require('./test_env.js');
const Walkthrough = require('./walkthrough.js');
const fs = require('fs');
const yaml = require('js-yaml');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/*
 * start test with default settings
 */
exports.startTest = function(args = {}) {
  let timeout = args.timeout || 30000; 

  // Change test timeout from 5s to 30s
  jest.setTimeout(30000);
}

/*
 * set up test environment
 */
exports.loadEnv = function(args) {
  if (isEmpty(args)) {
    return null;
  }

  return new TestEnv(args);
}

/*
 * set up walkthrough
 */
exports.loadWalkthrough = function(args) {
  if (isEmpty(args)) {
    return null;
  }

  return new Walkthrough(args);
}

/*
 * sets log path
 */
exports.setLog = function(args) {
  let log_path = args.log_path;

  fs.writeFile(log_path, '');

  const systemLog = console.log;

  console.log = (...msg) => {
    fs.appendFile(log_path, [...msg].join(' ') + '\n', (err) => {
      if (err) return systemLog(err);
    });
  };
}

/*
 * logs browser messages to log file
 */
exports.logConsole = function(page) {
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (error) => {
    console.log(error.message);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      console.log(response.status(), response.url());
    }
  });
  page.on('requestfailed', (request) => {
    console.log(request.failure().errorText, request.url);
  });
}


/*
 * load yaml file with pages and test data
 */
exports.loadPages = function(path) {
  return yaml.safeLoad(
      fs.readFileSync(path, 'utf8')
  );
}

/*
 * enable jQuery syntax of page source
 */
exports.loadJQuery = function(pageSource) {
  return cheerio.load(pageSource);
}

/*
 * load puppeteer
 */
exports.puppeteer = function(args = {}) {
  return puppeteer.launch(args)
}

function isEmpty(obj) {
  Object.keys(obj).length === 0 && obj.constructor === Object;
}
