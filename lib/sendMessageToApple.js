const { spawn } = require('child_process')

module.exports = function sendMessageToApple(message) {
    console.log(message)
    spawn('echo', [message])
}