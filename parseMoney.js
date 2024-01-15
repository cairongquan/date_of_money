const getOptionByPy = require("./lib/parseByPy");
const insertDataToDb = require('./lib/connectDb.js')
const moment = require('moment')

async function parseMoney(string, type) {
  return new Promise((resolve, reject) => {
    try {
      getOptionByPy(string).then(async (res) => {
        const obj = {
          date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          projectName: type,
          price: Number(res.price),
          thing: res.thing,
          string,
        };
        const data = await insertDataToDb(obj)
        resolve(JSON.stringify(obj))
      });
    } catch (err) {
      reject(err)
    }
  })
}


module.exports = parseMoney
