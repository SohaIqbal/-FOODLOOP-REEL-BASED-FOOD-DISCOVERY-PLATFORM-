import userModel from "../models/usermodel.js";
import foodPartnermodel from "../models/foodPartnermodel.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {

    try {
        const {fullname, email, password} = req.body;

        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }


        const hashedpassword = await bcrypt.hash(password, 10);
        const newuser = await userModel.create({
            fullname,
            email,
            password: hashedpassword
        });



        const token = jwt.sign({ id: newuser._id,}, process.env.JWTSECRET, {expiresIn: '1h'});
        res.cookie('token', token, )

        res.status(201).json({message: 'User registered successfully', user: {
            id: newuser._id,
            fullname: newuser.fullname,
            email: newuser.email
        }, token});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Server error'});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = jwt.sign({ id: user._id,}, process.env.JWTSECRET , {expiresIn: '1h'});
        res.cookie('token', token);

        res.status(200).json({message: 'User logged in successfully', user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        }, token});

        
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({message: 'Server error'});
        
    }

}

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'User logged out successfully'});
}

export const foodPartnerRegister = async (req, res) => {
    try {
        const{name, email, password, phone,address} = req.body;

        const existingPartner = await foodPartnermodel.findOne({email})
        if(existingPartner){
            return res.status(400).json({message: 'Food Partner already exists'});
            alert('Food Partner already exists');
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newPartner = await foodPartnermodel.create({
            name,
            email,
            password: hashedpassword,
            phone,
            address
        });
        const token = jwt.sign({ id: newPartner._id,}, process.env.JWTSECRET, {expiresIn: '1h'});   
        res.cookie('token', token)

        res.status(201).json({message: 'Food Partner registered successfully', partner: {
            id: newPartner._id,
            name: newPartner.name,
            email: newPartner.email,
            phone: newPartner.phone
        }, token});

    } catch (error) {
        console.error('Error registering food partner:', error);
        alert('Error registering food partner');
        res.status(500).json({message: 'Server error'});
        
    }
}

export const foodPartnerLogin = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const partner = await foodPartnermodel.findOne({email});
        if(!partner){
            return res.status(400).json({message: 'Invalid email or password'});
        }   
        const isPasswordValid = await bcrypt.compare(password, partner.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = jwt.sign({ id: partner._id,}, process.env.JWTSECRET , {expiresIn: '1h'});
        res.cookie('token', token);

        res.status(200).json({message: 'Food Partner logged in successfully', partner: {
            id: partner._id,
            email: partner.email,
            name: partner.name
        }, token});

        
    } catch (error) {
        console.error('Error logging in food partner:', error);
        res.status(500).json({message: 'Server error'});
        
    }
}

export const foodPartnerLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Food Partner logged out successfully'});
}

export const getFoodPartner = async (req, res) => {
    try {
        const partner = await foodPartnermodel.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }
        res.status(200).json({ partner });
    } catch (error) {
        console.error('Error fetching food partner:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }   }


export const getFoodPartnerInfo = async (req, res) => {
    try {
        const partner = await foodPartnermodel.findById(req.foodpartner._id);
        console.log(req.foodpartner._id);
        if (!partner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }
        res.status(200).json({ partner });
    } catch (error) {
        console.error('Error fetching food partner:', error);
        res.status(500).json({ message: 'Server error' });
    }       }