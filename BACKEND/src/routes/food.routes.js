import express from 'express';
import { createFood, getAllFoods, likeFood , SaveFood, SavedVideos} from '../controllers/food.controller.js';
import { authenticateFoodPartner ,authenticateUser, authenticateany} from '../middleware/auth.middleware.js';
import multer from 'multer';


const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(), 
    
})

// api is now protected

router.post('/createfood',authenticateFoodPartner, upload.single("video"),createFood);
router.get('/createfood', authenticateany, getAllFoods);
router.post('/like', authenticateUser, likeFood);
router.post('/save', authenticateUser, SaveFood);
router.get('/saved-videos' , authenticateUser,SavedVideos )


export default router;