import argon2 from "argon2";
import { generateRefreshToken, generateAccessToken } from "../utils/generate.token.js";
import { registerRepository, findByEmail, userCount, findById } from "../repository/auth.repository.js";

//register
export const register = async(data) =>{
    try {
        const existing = await findByEmail(data.email);
        if (existing){
            throw new Error("Email already exists");
        }
        const hashedPassword = await argon2.hash(data.password);

        const count = await userCount();
        if (count < 1) {
            data.role = "admin";
        }

        const user = await registerRepository({
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
        const user = await findByEmail(email);
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
        const userProfile = await findById(userId);
        if (!userProfile){
            throw new Error("User not found");
        }
        return userProfile;

    } catch (error) {
        throw error;
    }
}

