const path = require('path');

const interfaces = require('../interfaces');
const reporters = require('../reporters');
const Suite = require('./suite');
const Runner = require('./runner');
const utils = require('./utils');

class Mocha {
  constructor() {
    // 创建一个根suite
    this.rootSuite = new Suite({
      title: '',
      parent: null
    });
    // 使用bdd测试风格，将API挂载到global对象上
    const ui = 'bdd';
    interfaces[ui](global, this.rootSuite);

    // 执行测试用例文件，构建suite-test树
    const spec = path.resolve(__dirname, '../../test');
    const files = utils.lookupFiles(spec);
    files.forEach(file => {
      require(file);
    });
  }

  run() {
    const runner = new Runner();
    reporters['spec'](runner);
    runner.run(this.rootSuite);
  }
}

module.exports = Mocha;