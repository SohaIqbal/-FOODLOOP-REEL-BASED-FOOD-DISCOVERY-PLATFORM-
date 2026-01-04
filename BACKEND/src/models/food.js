import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    name: { type: String, required: true},
    video : { type: String, required: true},
    description: { type: String},
    foodpartner:{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodPartner' , required: true},
    likecount: { type: Number, default: 0 },
    savecount: { type: Number, default: 0 },
    commentcount:{type: Number, default: 0}

})

const Food = mongoose.model('Food', foodSchema);
export default Food;