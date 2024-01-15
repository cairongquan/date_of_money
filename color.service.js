const express = require('express')
const {
  readFileSync,
} = require('fs')

const app = express()

const colors = readFileSync('./collection.json', 'utf-8')

const parseMoney = require('./parseMoney')

app.use((req, res, next) => {
  // console.log(req);
  //设置请求头
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  next();
});


app.get('/colors', (req, res) => {
  res.send({
    data: JSON.parse(colors)
  })
})

app.get('/', (req, res) => {
  res.send('china_color service run here')
})

app.get('/parseMoney', async (req, res) => {
  const { string, type } = req.query
  const response = await parseMoney(string, type)
  res.send(response)
})

app.listen(27074, () => {
  console.log('china_color service run success')
})
