import express from 'express';

import { foodPartnerRegister, foodPartnerLogin, foodPartnerLogout, getFoodPartner, getFoodPartnerInfo } from '../controllers/auth.controller.js';
import { authenticateUser, authenticateFoodPartner } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', foodPartnerRegister);
router.post('/login', foodPartnerLogin);
router.post('/logout', foodPartnerLogout);
router.get('/:id', authenticateUser, getFoodPartner);
router.get('/me',authenticateFoodPartner, getFoodPartnerInfo);

export default router;