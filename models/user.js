var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type:String,required:true},
    username: {
        type:String,
        unique: true,
        required: true,
        trim: true
    },
    updated: { type: Date, default: Date.now },
    date_of_birth: { type: Date, required: true}
});

UserSchema.plugin(require('mongoose-bcrypt'));


module.exports = mongoose.model('User', UserSchema);
