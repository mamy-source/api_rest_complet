import argon2 from "argon2";
import { generateRefreshToken, generateAccessToken } from "../utils/generate.token.js";
import * as authRepo from "../repository/auth.repository.js"
//register
export const register = async(data) =>{
    try {
        const existing = await authRepo.findByEmail(data.email);
        if (existing){
            throw new Error("Email already exists");
        }
        const hashedPassword = await argon2.hash(data.password);

        const count = await authRepo.userCount();
        if (count < 1) {
            data.role = "ADMIN";
        }

        const user = await authRepo.registerRepository({
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
            role: data.role 
        });
        return user;
    } catch (error) {
        throw error;
    }

}

//login
export const loginService = async(email, password) => {
    try {
        const user = await authRepo.findByEmail(email);
        if (!user){
            throw new Error("Invalid credentiels");
        }
        //verification password
        const valid = await argon2.verify(user.password, password);
        if(!valid){
            throw new Error("Invalid password");
        }
        //generate token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return {user, accessToken, refreshToken}
    } catch (error) {
        throw error;
    }
};

//profile
export const profileService = async(userId) =>{
    try {
        const userProfile = await authRepo.findById(userId);
        if (!userProfile){
            throw new Error("User not found");
        }
        return userProfile;

    } catch (error) {
        throw error;
    }
}

export const getProfile = async(userId) =>{
    const profile = await authRepo.getProfileByUserId(userId);
    if(!profile){
        throw new Error("Profile not found");
    }
    return profile;
}


//create profile
export const createProfile = async(data) => {
    try {
        const existingProfile = await authRepo.getProfileByUserId(data.userId);
        if (existingProfile){
            throw new Error("Profile already exists");
        }
        const newProfile = await authRepo.createProfile({data})
        return newProfile;

    } catch (error) {
        throw error;
    }
}

//update profile
export const updateProfile = async(userId, data) =>{
    try {
        const userProfile = await authRepo.getProfileByUserId(userId);
        if (!userProfile){
            throw new Error("Profile not found");
        }
        const newProfile = await authRepo.updateProfile(userId, data)
        return newProfile;
    } catch (error) {
        throw error;
    }
};


// delete profile
export const deleteProfile = async (userId) => {

    const existingProfile =
        await authRepo.getProfileByUserId(userId);

    if (!existingProfile) {
        throw new Error("Profile not found");
    }

    return await authRepo.deleteProfile(userId);
};