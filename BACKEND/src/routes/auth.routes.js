import express from 'express';
import { registerUser , loginUser, logoutUser, getUser} from '../controllers/auth.controller.js';
import { authenticateFoodPartner, authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/user/register', registerUser);
router.post('/user/login',loginUser);
router.post('/user/logout',authenticateUser,logoutUser); 
router.get('/user/me', authenticateUser, getUser);



export default router;