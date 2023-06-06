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
const sendMessageToApple = require('./lib/sendMessageToApple')


async function init() {
  const userSendString = getUserSend();
  try {
    getOptionByPy(userSendString).then((res) => {
      const obj = { timer: new Date().getTime(), str: userSendString, price: res.price, thing: res.thing };
      readFileHandle(filePath)
        .then(async ({ fileStatus, resolve }) => {
          resolve.push(obj);
          writeFileHandle(filePath, JSON.stringify(resolve));
          await sendMessageToApple(JSON.stringify(obj))
        })
        .catch(async (err) => {
          writeFileHandle(filePath, JSON.stringify([obj]));
          await sendMessageToApple(JSON.stringify(obj))
        });
    })
  } catch (err) {
    console.log(err, 'err');
  }
}

init();
