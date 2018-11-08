module.exports = {
    sayHelloKor(){
        return '안녕';
    },
    sayHelloEng(){
        return 'hello';
    },
    sayHelloSwah(){
        return '잠깨';
    }
};



//함수만 module 생략 가능
exports.sayHelloKor = () => {return '안녕'};

exports.sayHelloEng = () => {return 'hello'};

exports.sayHelloSwah = () => {return '잠깨'};

