import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiErrors.js";
import { User } from "../models/user.model.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import { json } from "express";

const registerUser = asyncHandler( async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
  
  const {fullName,username, email , password} = req.body

  if([fullName, username, email, password].some((field)=> field?.trim() === "")){
    throw new ApiError(400, "All fields are required")
  }

 const existingUser = User.findOne({
   $or: [{email},{username}]
 })

 if(existingUser){
   throw new ApiError(409, "User with given email or username already exists")
 }

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path

 if(!avatarLocalPath){
   throw new ApiError(400, "Avatar is missing :: required")
 }

 const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)


 if(!avatar){
   throw new ApiError(400, "Avatar is missing :: required")
 }

  const user = User.create({
   fullName, avatar:avatar.url,
   coverImage: coverImage?.url || "",
    email,
   password,
   username: username.toLowerCase()
 })

 const createduser = await User.findById(user._id).select("-password -refreshToken")
 if(!createduser){
   throw new ApiError(500, "Something went wrong in registering the user")
 }

 return res.status(201, json(new ApiResponse(200, createduser, "User got registered successfully")))

});



export { registerUser };
