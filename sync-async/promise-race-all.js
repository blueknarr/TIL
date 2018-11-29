const p1 = new Promise((resolve, reject)=>{
    console.log('Fetching from bank1');
    setTimeout(()=>{
        const response = { bank:1, delayed: false};
        resolve(!response.delayed);
    },1000)
});

const p2 = new Promise((resolve, reject)=>{
    console.log('Fetching from bank 2');
    setTimeout(()=>{
        const response = { bank:2, delayed: true};
        resolve(!response.delayed);
    },1500)
});

const p3 = new Promise(()=>{
    console.log('Fetching from bank 3');
    setTimeout(()=>{ 
        const response = { bank:3, delayed: false};
        resolve(!response.delayed);
    },2000)
});

Promise.all([p1,p2,p3])
.then(result => console.log(result));

Promise.race([p1,p2,p3])
.then(result => console.log(result));