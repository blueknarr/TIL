const EventEmitter = require('events');

class Emitter extends EventEmitter{};
emitter = new Emitter();

emitter.on('knock',() => {
    console.log('who are you?');  
});
emitter.on('knock', () => {
    console.log('go away');
});

emitter.emit('knock');
emitter.removeAllListeners();
emitter.emit('knock')