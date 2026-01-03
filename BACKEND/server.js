import dotenv from 'dotenv';
dotenv.config();

import app from "./src/app.js";

import { connectDB } from "./src/db/db.js";

console.log('Env vars loaded:', {
  JWTSECRET: process.env.JWTSECRET,
  MONGODB_URL: process.env.MONGODB_URL,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
});


connectDB();

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});