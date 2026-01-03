import mongoose from "mongoose";

const like = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
}, { timestamps: true });

const LikeModel = mongoose.model('Like', like);
export default LikeModel;
    