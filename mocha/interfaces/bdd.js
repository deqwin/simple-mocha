const Suite = require('../src/suite');
const Test = require('../src/test');
const { adaptPromise } = require('../src/utils');

module.exports = function (context, root) {

  // 记录suite路径
  const suites = [root];

  context.describe = context.context = function (title, fn) {
    const parent = suites[0];
    const suite = new Suite({
      title,
      parent
    });
    suites.unshift(suite);
    fn.call(suite);
    suites.shift(suite);
  }

  context.it = context.specify = function (title, fn) {
    const parent = suites[0];
    const test = new Test({
      title,
      fn: adaptPromise(fn)
    });
    parent.tests.push(test);
  }

  context.before = function (fn) {
    const cur = suites[0];
    cur._beforeAll.push(adaptPromise(fn));
  }

  context.after = function (fn) {
    const cur = suites[0];
    cur._afterAll.push(adaptPromise(fn));
  }

  context.beforeEach = function (fn) {
    const cur = suites[0];
    cur._beforeEach.push(adaptPromise(fn));
  }

  context.afterEach = function (fn) {
    const cur = suites[0];
    cur._afterEach.push(adaptPromise(fn));
  }
}