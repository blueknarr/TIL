const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello-mongo',{useNewUrlParser:true})
.then(()=>{console.log('connected to mongodb')})
.catch((error)=>{console.error(error.message)});

//Available Schema DataTypes : String, Number, Date, Buffer, Boolean, ObjectID
//Available Validating options
//String: minlength, maxlength, match, enum
//Numbers, Dates: min, max
//All: required
const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author:String,
    tags: {
        type: Array,
        //custom validator
        validate:{
            validator:function(tags){ 
                const result = tags.every(tag => tag.length > 0);
                return tags && tags.length > 0 
            }, //문자가 있고 0이 아니다
            message: 'A Course should have at least 1 tag'
        }
    },
    date: {type: Date, default:Date.now},
    isPublished: Boolean
});

//이름과 스키마를 맵핑해야함
const Course = mongoose.model('Course',courseSchema);

/*CRUD Operation */
/* Create */
async function createCourse(){
    const course = new Course({
        name: '실전 취업 특강',
        author:'채용팀장',
        tags:['자소서','면접','채용'],
        isPublished:true
    });
    try{
        const result = await course.validate(); //db에 넣을 수 있는지 유효성 검사를 해봐라
        console.log(result);
        //const result = await course.save();
        //console.log(result);
    }catch{
        console.error(error.message);
    }
}

/* Read */
async function getCourses(){
    const courses = await Course
    // .find({isPublished:true}) 
    // .limit(10) //10개만 가저온다
    // .sort({name:-1}) //역순출력
    // .select({name:1, tags:1}) //name과 tags만 가져온다.
    //.find(price:{ $gt:15 })
    // .find({author:/^ne/i}) //ne로 시작하는 문자열 찾기, i:대소문자 다 찾음
    // .find({author:/hn$/}) 
    // .find({author:/.*oh.*/})//oh가 있는 문자열을 찾기 
    //.count() //내가 받는 결과를 보여줌
    console.log(courses);
}
/* 비교 쿼리 연산자
$eq : equal
$neq: not equal
$gt: greater than
$gte: greater than or equal to
$lt: less than
$lte:
$in
$nin
*/

/* 논리 쿼리 연산자
.or
Course
    .find()
        .or([{author:'neo'},{'isPublished:false'}])

.and
    .find()
        .and([{author:'neo'},{'isPublished:false'}])
*/

//getCourses();

/* Update */
/* 1. Query First find -> change -> save */
async function updateCourse(id){
    
    //find
    const course = await Course.findById(id);
    if(!course) return;

    //change
    course.author = 'my name';
    course.tags = ['re','te'];

    //save
    const result = await course.save();
    console.log(result);
}
//updateCourse('5bea6394536f3422c81c7d2d');

/* 2. 직접 Update -> result */
async function updateCourse2(){
    const result2 = await Course.updateMany({isPublished:true}, {
        $set:{
            author:'ta',
        }
    })
    console.log(result2);
}
//updateCourse2();

/* Destroy */
async function removeCourse(id){
    const result = await Course.deleteOne({_id: id});
    console.log(result);
}

//removeCourse('5bea6394536f3422c81c7d2d');

//createCourse();
