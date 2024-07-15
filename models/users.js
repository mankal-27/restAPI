const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create GeoLocationScheama

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

//Create Ninja user Scheam model

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Field is Mandatory"]
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Ninja = mongoose.model("ninja", NinjaSchema);

module.exports = Ninja;
