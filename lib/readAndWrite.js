const fs = require('fs');

module.exports = {
  readFileHandle(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          return reject({ fileStatus: 0, resolve: null });
        }
        resolve({ fileStatus: 1, resolve: JSON.parse(data) });
      });
    });
  },
  writeFileHandle(filePath, data) {
    fs.writeFile(filePath, data, () => {});
  }
};
