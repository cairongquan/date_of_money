/*
 * @Author: cairq cairq@tongbaninfo.com
 * @Date: 2023-06-01 22:38:40
 * @LastEditors: cairq cairq@tongbaninfo.com
 * @LastEditTime: 2023-06-06 20:53:36
 * @FilePath: \dateof_money\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getUserSend = require('./lib/getUserSend');
// const parseByAi = require('./lib/parseByAI');
const dotenv = require('dotenv');
const path = require('path');
const moment = require('moment');
const { readFileHandle, writeFileHandle } = require('./lib/readAndWrite');

const { filePathName } = dotenv.config({
  path: path.join(__dirname, './config.env')
}).parsed;
const fileName = moment(new Date()).format('YYYYMMDD') + '.json';
const filePath = path.join(filePathName, fileName);

const getOptionByPy = require('./lib/parseByPy')

async function init() {
  const userSendString = getUserSend();
  try {
    getOptionByPy(userSendString).then((res) => {
      const obj = { timer: new Date().getTime(), str: userSendString, price: res.price, thing: res.thing };
      readFileHandle(filePath)
        .then(({ fileStatus, resolve }) => {
          resolve.push(obj);
          writeFileHandle(filePath, JSON.stringify(resolve));
          console.log(JSON.stringify(resolve))
        })
        .catch((err) => {
          writeFileHandle(filePath, JSON.stringify([obj]));
        });
    })
  } catch (err) {
    console.log(err, 'err');
  }
}

init();
