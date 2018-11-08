const EventEmitter = require('events');


class Logger extends EventEmitter{
    log(msg) {
        console.log(msg, 'is logging');
        this.emit('logMessage', {id:1, url: 'a'});
        this.emit('logging', {data: 'event is happening' });
    };
}

module.exports = log;