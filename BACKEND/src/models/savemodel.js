import mongoose from "mongoose";

const save = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
}, { timestamps: true });
const SaveModel = mongoose.model('Save', save);
export default SaveModel;