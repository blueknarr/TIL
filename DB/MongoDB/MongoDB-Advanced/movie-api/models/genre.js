const Joi = require('joi'); //model에만 있으면 된다.
const mongoose = require('mongoose');



/* Model */
const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    }
});

const Genre = mongoose.model('Genre',genreSchema);
function validateGenre(Genre){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
    }
    return Joi.validate(Genre,schema);
}

module.exports.Genres = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;