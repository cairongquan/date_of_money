const { spawn } = require('child_process')
const { join } = require('path')

module.exports = function getOptionByPy(value) {
    return new Promise((resolve, reject) => {
        const pyChild = spawn('python3', [join(__dirname, '../test.py'), value])

        pyChild.stdout.on("data", (data) => {
            resolve(JSON.parse(data.toString()))
        })
        pyChild.stderr.on("err", (err) => {
            reject(err.toString())
        });
    })
}