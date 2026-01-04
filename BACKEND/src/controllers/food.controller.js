import foodmodel from '../models/food.js';
import { PassThrough } from 'stream';

import likeModel from '../models/likemodel.js';
import cloudinary from "../services/cloudinary.js";
import SaveModel from '../models/savemodel.js';
import { triggerAsyncId } from 'async_hooks';
import commentModel from '../models/Commentmodel.js';
export const createFood = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video is required" });
    }

    // Upload video to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "food_videos",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Cloudinary video URL
    const videoUrl = uploadResult.secure_url;

    // Save in DB
    const food = await foodmodel.create({
      name,
      description,
      video: videoUrl,
      foodpartner: req.foodpartner._id, // from authenticateFoodPartner
    });

    res.status(201).json({
      message: "Food created successfully",
      success: true,
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await foodmodel.find({}).populate('foodpartner', 'name');
    res.status(200).json({ message:"food fetched successfully" ,foods });


    
  } catch (error) {
    
  }
}

export const likeFood = async (req, res) => {
  try {
    const [userId, foodId] = [req.user._id, req.body.foodId];

    // Check if the user has already liked the food
    const existingLike = await likeModel.findOne({ user: userId, food: foodId });
    if (existingLike) {
      const deletedlike = await likeModel.deleteOne({ user: userId, food: foodId });

      const updatedFood = await foodmodel.findByIdAndUpdate(
        foodId,
        { $inc: { likecount: -1 } },
        { new: true }
      );


      return res.status(200).json({ message: "Food unliked successfully" , food: updatedFood, deletedlike });

    }
    // Create a new like
    const newLike = await likeModel.create({ user: userId, food: foodId });

    const totalLikes = await likeModel.countDocuments({ food: foodId });

    const updatedFood = await foodmodel.findByIdAndUpdate(
      foodId,
      // { $inc: { likecount: 1 } },
      {likecount: totalLikes },
      { new: true }
    );

    





    res.status(201).json({ message: "Food liked successfully",  food: updatedFood, newLike });
    
  } catch (error) {
    
    res.status(500).json({ message: "Server error" });
  }

}
// export const SaveFood = async (req, res) => {
//   try {
//     const [userId, foodId] = [req.user._id, req.body.foodId];

//     // Check if the user has already saved the food
//     const existingSave = await SaveModel.findOne({ user: userId, food: foodId });
//     if (existingSave) {
//       const deletedsave = await SaveModel.deleteOne({ user: userId, food: foodId });

//       const updatedsave = await foodmodel.findByIdAndUpdate(
//         foodId,
//         { $inc: { savecount: -1 } },
//         { new: true }
//       );
//       return res.status(200).json({ message: "Food unsaved successfully" ,save:updatedsave, deletedsave });
//     }

//     // Create a new save  
//     const newSave = await SaveModel.create({ user: userId, food: foodId });

//     const totalsaves = await SaveModel.countDocuments({ food: foodId });
//     res.status(201).json({ message: "Food saved successfully", newSave , totalsaves });

    
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
    
//   }
// }


export const SaveFood = async (req, res) => {
  try {
    const userId = req.user._id;
    const foodId = req.body.foodId;


    

//     console.log("USER:", req.user._id.toString());
// console.log("FOOD:", foodId.toString());

    const existingSave = await SaveModel.findOne({ user: userId, food: foodId });

    if (existingSave) {
      // Unsave
      await SaveModel.deleteOne({ user: userId, food: foodId });

      await foodmodel.findByIdAndUpdate(
        foodId,
        { $inc: { savecount: -1 } },
        { new: true }
      );
    } else {
      // Save
      await SaveModel.create({ user: userId, food: foodId });

       await foodmodel.findByIdAndUpdate(
        foodId,
        { $inc: { savecount: 1 } },
        { new: true }
      );
    }


    // Recalculate total saves
    const totalSaves = await SaveModel.countDocuments({ food: foodId });

    // Update food savecount
    const updatedFood = await foodmodel.findByIdAndUpdate(
      foodId,
      { savecount: totalSaves },
      { new: true }
    );

    res.status(200).json({
      message: existingSave ? "Food unsaved successfully" : "Food saved successfully",
      food: updatedFood
    });



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const SavedVideos = async (req, res) => {

  const userId  = req.user._id;

  try {
    const savedFoods = await SaveModel.find({ user: userId }).populate('food');
  res.status(200).json({ savedFoods });
    
  } catch (error) {
    
    console.error(error);
  }







}

export const CommentOnFood = async (req, res) => {

  try {
    
    const userId = req.user._id;
    const foodId =  req.body.foodId;

    const food = await foodmodel.findById(foodId);

    if(!food){
      return res.status(404).json({ message: "Food not found" });
    }
    await commentModel.create({
      user: userId,
      food: foodId,
      content: req.body.content
    });
    
       await foodmodel.findByIdAndUpdate(
        foodId,
        { $inc: { commentcount: 1 } },
        { new: true }
      );
    const totalComments = await commentModel.countDocuments({ food: foodId });

    const updatedFood = await foodmodel.findByIdAndUpdate(
      foodId,
      { commentcount: totalComments },
      { new: true }
    );

    res.status(201).json({ message: "Comment added successfully", food: updatedFood });
      

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    
  }

}


export const GetComments = async (req, res) => {

  try {
    const {foodId} = req.params;
    const comments = await commentModel.find({ food: foodId }).populate('user', 'fullname').sort({createdAt: -1});
    res.status(200).json({ comments });


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    
  }}