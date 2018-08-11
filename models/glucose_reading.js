var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var GlucoseReadingSchema = new Schema({
    patient:{type:ObjectId,required:true},
    updated:{ type: Date, default: Date.now },
    reading:{ type: Number, required: true},
    time_of_reading:{ type: Date, required: true }
});

module.exports = mongoose.model('GlucoseReading', GlucoseReadingSchema);