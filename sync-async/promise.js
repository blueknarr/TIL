//resolve: success, reject: failed
const promise = new Promise((resolve, reject)=>{
    const number = Math.floor(Math.random() * 100);
    //async 작업중...
    if(number % 2 === 1) resolve({id:1, email:'1@gmail.com'});
    else reject(new Error('Error...'));
});


//then(): 성공했을 때 then 안에 있는 내용들로 무엇을 하겠다.
//catch(): 실패했을 때 reject 실행
promise
.then(user => console.log(user))
.catch(error => console.error(error.message));

