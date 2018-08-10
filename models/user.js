var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type:String,required:true},
    username: {type:String,required:true},
    password: {type:String,required:true},
    updated: { type: Date, default: Date.now },
    date_of_birth: { type: Date, required: true}
});

module.exports = mongoose.model('User', UserSchema);
