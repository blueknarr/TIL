/* ES6 */
class Car{
    constructor({ title }){
        this.title = title;
    }
    drive(){
        return 'Vroom';
    }
}

//상속받은 클래스는 destructuring을 하지 않는다.
class Audi extends Car {
    constructor(options){
        super(options);
        this.color = options.color; 
    }
    honk(){
        return '빵빵';
    }
}

const car = new Car({title: 'A6'});
console.log(car);
console.log(typeof car);

class Monster {
    constructor(options){
        this.health = 100;
        this.name = options.name;
    }
}

class Pickachu extends Monster{
    constructor(options){
        super(options);
    }
    bite(monster){
        monster.health-=10;
    }
}

const monster = new Monster({ name: '꼬렛'});
const pickachu = new Pickachu({name: '피카츄'});
pickachu.bite(monster);
console.log(monster);
