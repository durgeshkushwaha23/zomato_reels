const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    foodpartner: {
       type:mongoose.Schema.Types.ObjectId,
       ref:"Foodpartner"
    }
});

module.exports = mongoose.model('Food', FoodSchema); 