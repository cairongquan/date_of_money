const { spawn } = require('child_process')
const { join } = require('path')

module.exports = function getOptionByPy(value) {
    console.log(value, 2)
    return new Promise((resolve, reject) => {
        const pyChild = spawn('python3', [join(__dirname, '../test.py'), value])

        pyChild.stdout.on("data", (data) => {
            console.log(data.toString())
            resolve(JSON.parse(data.toString()))
        })
        pyChild.stderr.on("err", (err) => {
            console.log(err.toString())
            reject(err.toString())
        });
    })
}