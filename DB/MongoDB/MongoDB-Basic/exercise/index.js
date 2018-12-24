const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exercise-basic',{useNewUrlParser:true})
.then(()=>{console.log('connected to mongodb')})
.catch((error)=>{console.error(error.message)});

const courseSchema = new mongoose.Schema({
    tags:[String],
    date:{type:Date, default:Date.now},
    name:String,
    author:String,
    isPublished:Boolean,
    price:Number,
    __v:Number
});

const Course = mongoose.model('Course',courseSchema);

async function getCourses1(){
    const ex1 = await Course
    //.find().and([{isPublished:true},{tags:'backend'}])
    .find({isPublished:true,tags:'backend'})
    .sort({name:1})
    .select('name author');
    console.log(ex1);
}

async function getCourses2(){
    const ex2 = await Course
    .find({isPublished:true}).or([{tags:'frontend'},{tags:'backend'}])
    .sort('-price')
    .select('name price');
    console.log(ex2);
}

async function getCourses3(){
    const ex3 = await Course
    .find()
    .or([{price:{$gte:15}},{name:/.*js.*/i}]);
    console.log(ex3);
}

//getCourses1();
//getCourses2();
getCourses3();