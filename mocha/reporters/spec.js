const constants = require('../src/runner').constants;

const colors = {
  pass: 90,
  fail: 31,
  green: 32,
}

function color(type, str) {
  return '\u001b[' + colors[type] + 'm' + str + '\u001b[0m';
}

module.exports = function (runner) {

  let indents = 0;
  let passes = 0;
  let failures = 0;

  function indent(i = 0) {
    return Array(indents + i).join('  ');
  }

  // 执行开始
  runner.on(constants.EVENT_RUN_BEGIN, function() {
    console.log();
  });

  // suite执行开始
  runner.on(constants.EVENT_SUITE_BEGIN, function(suite) {
    console.log();

    ++indents;
    console.log(indent(), suite.title);
  });

  // suite执行结束
  runner.on(constants.EVENT_SUITE_END, function() {
    --indents;
    if (indents == 1) console.log();
  });

  // 用例通过
  runner.on(constants.EVENT_PASS, function(title) {
    passes++;

    const fmt = indent(1) + color('green', '  ✓') + color('pass', ' %s');
    console.log(fmt, title);
  });

  // 用例失败
  runner.on(constants.EVENT_FAIL, function(title) {
    failures++;

    const fmt = indent(1) + color('fail', '  × %s');
    console.log(fmt, title);
  });

  // 执行结束
  runner.once(constants.EVENT_RUN_END, function() {
    console.log(color('green', '  %d passing'), passes);
    console.log(color('fail', '  %d failing'), failures);
  });
}