const path = require('path');
const fs = require('fs');

module.exports.lookupFiles = function lookupFiles(filepath) {
  let stat;

  // 假设路径是文件
  try {
    stat = fs.statSync(`${filepath}.js`);
    if (stat.isFile()) {
      // 确实是文件，直接以数组形式返回
      return [filepath];
    }
  } catch(e) {}
	
  // 假设路径是目录
  let files = []; // 存放目录下的所有文件
  fs.readdirSync(filepath).forEach(function(dirent) {
    let pathname = path.join(filepath, dirent);

    try {
      stat = fs.statSync(pathname);
      if (stat.isDirectory()) {
        // 是目录，进一步递归
        files = files.concat(lookupFiles(pathname));
      } else if (stat.isFile()) {
        // 是文件，补充到待返回的文件列表中
        files.push(pathname);
      }
    } catch(e) {}
  });
	
  return files;
}

module.exports.adaptPromise = function(fn) {
  return () => new Promise(resolve => {
    if (fn.length == 0) { // 不使用参数 done
      try {
        const ret = fn();
        // 判断是否返回promise
        if (ret instanceof Promise) {
          return ret.then(resolve, resolve);
        } else {
          resolve();
        }
      } catch (error) {
        resolve(error);
      }
    } else { // 使用参数 done
      function done(error) {
        resolve(error);
      }
      fn(done);
    }
  })
}