const EventEmitter = require('events');

class Job extends EventEmitter{}

const job = new Job();

//warning 이라는 이벤트가 발생하면, 익명함수를 실행하라.
job.on('warning',(season) => {
    //이벤트 핸들러
    console.log(`${season} is coming...`);
});

//이벤트를 발생한다.
job.emit('warning','winter');