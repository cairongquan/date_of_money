const { spawn } = require('child_process')

module.exports = function sendMessageToApple(message) {
    spawn('echo', [message])
}