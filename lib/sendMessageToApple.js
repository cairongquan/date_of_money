const { spawn } = require('child_process')

module.exports = function sendMessageToApple(message) {
    return new Promise((resolve, reject) => {
        const command = `echo ${message}`;
        const messageData = spawn('sh', ['-c', command])

        messageData.stderr.on('error', (error) => {
            console.log(error.toString())
            reject(error)
        })

        messageData.stdout.on('data', (data) => {
            console.log(data.toString())
            resolve()
        })
    })
}