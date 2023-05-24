import bcrypt from 'bcrypt'
import User from "../models/user-model.js";
import mongoose, { get } from 'mongoose';
// import HttpError from "../models/http-error.js";

export const createUser = async (req, res) =>{
    const data = req.body;
    const email = (data.email).toLowerCase().trim();
    data.weight = []
    data.height = []
    let profileImage = ''
    let encryptedPassword
    // check email has already exist
    const checkEmail = await User.find({email}).exec()
    if(checkEmail.length > 0){
         return res.status(200).json({
            message:'email already exists'
        })
    }
    // encrypt password
    if(!data.password){
        return res.status(200).json({
            message: 'password is required'
        })
    }else{
        encryptedPassword =  bcrypt.hashSync((data.password).trim(), bcrypt.genSaltSync(10))
    }
    // create userDoc
    const userDoc = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        profileImage: profileImage,
        email: email,
        password: encryptedPassword,
        weight: data.weight,
        height: data.height,
    })
    // validate schema
    const error = userDoc.validateSync()
    if(error){
        const errordetail = Object.keys(error.errors).map(err=>{
            return error.errors[err].properties.message
        })
        return res.status(200).json({
            message: errordetail
        })
    }
    // save to database
    await userDoc.save()
    return res.status(200).json({
        message: 'user created successfully'
    })
} 

