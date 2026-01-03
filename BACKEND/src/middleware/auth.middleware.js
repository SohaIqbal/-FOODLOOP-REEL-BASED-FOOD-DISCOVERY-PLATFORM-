import Food from "../models/food.js"
import FoodPartner from "../models/foodPartnermodel.js";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";


export const authenticateFoodPartner = async (req, res, next) => {

    console.log('Authenticating food partner...');
    try {
        const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

     try {
           // verifies whether the token is correct or not
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        // if token is correct then decoded gets the id of the partner because while creating token we set the id only,  so it checks with the id whether such partner exists
        const foodpartner = await FoodPartner.findById(decoded.id);
        if (!foodpartner) {
            return res.status(401).json({ message: "Unauthorized: Food Partner not found" });
        }

        //sending this data to the next middleware or controller
        req.foodpartner = foodpartner; 
        next();
        
     } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });

        
     }


        
    } catch (error) {
        res.status(500).json({ message: "Server error" });

        
    }
}

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWTSECRET);
            const user = await userModel.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "Unauthorized: ok not found" });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        
    }
}


export const authenticateany = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        const user = await userModel.findById(decoded.id);

        if (user) {
            req.user = user;
            return next();
        }

        const foodpartner = await FoodPartner.findById(decoded.id);
        if (foodpartner) {
            req.foodpartner = foodpartner;
            return next();
        }


        return res.status(401).json({ message: "Unauthorized: User or Food Partner not found" });

        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        
    }
}