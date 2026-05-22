import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { saveAvatar, deleteAvatar } from "../utils/saveAvatar.js";
import { success } from "zod";

//register
export const register = async (req, res, next) =>{
    try {
        
        const resultat = await authService.register(req.body);
        res.status(201).json({message: "User registered successfully", resultat})
    } catch (error) {
        next(error);
    }
};

//login
export const login = async(req, res, next) =>{
    try {
        const {email, password} = req.body;
        const resultat = await authService.loginService(email, password);

        res.cookie("refreshToken", resultat.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "User logged in successfully",
            user: resultat.user,
            accessToken: resultat.accessToken

        });
    } catch (error) {
        next(error);
    }
};

//profile
export const profile = async(req, res, next) =>{
    try {
        const user = await authService.profileService(req.user.id);
        res.status(200).json({message: "User profile", user});
    } catch (error) {
        next(error)
    }
};
export const getProfile = async (req, res, next)=>{
  try {
    const profile = await authService.getProfile(req.user.id);
    res.status(200).json({message: "Your Profile",success:true, data:profile})
  } catch (error) {
    next(error)
  }
}



export const createprofile = async(req, res, next) =>{
  try {
    let avatarPath = null;
    if(!req.file){
      avatarPath = await saveAvatar(req.file);
    }
    const userProfile = await authService.createProfile({
      phone: req.body.phone,
      avatar: avatarPath,
      userId: req.user.id
    });
    res.status(201).json({message: "Profile created successfully", data:userProfile});
  } catch (error) {
    next(error);
  }
}

export const updateProfil = async (req, res, next) => {
  
  try {

    const exist = await authService.getProfile(req.user.id);

    let avatarPath = exist.avatar;

    if (req.file) {
      deleteAvatar(exist.avatar);
      avatarPath = await saveAvatar(req.file);
    }

    const newProfile = await authService.updateProfile(
      req.user.id,
      {
        phone: req.body?.phone || exist.phone,
        avatar: avatarPath
      }
    );

    res.status(200).json({
      message: "Profile changed successfully",
      data: newProfile
    });

  } catch (error) {
    next(error);
  }
};

// delete profile
export const deleteProfile = async (req, res, next) => {

  try {

      const existingProfile =
          await authService.getProfile(req.user.id);

      // supprimer image
      deleteAvatar(existingProfile.avatar);

      await profileService.deleteProfile(req.user.id);

      res.status(200).json({
          message: "Profile deleted successfully"
      });

  } catch (error) {
    next(error)

  }
};

export const refreshToken = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
  
      if (!refreshToken) {
        return res.status(401).json({
          message: "Refresh token missing"
        });
      }
  
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
  
      const accessToken = jwt.sign(
        {
          id: decoded.id,
          role: decoded.role
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
        }
      );
  
      return res.status(200).json({
        accessToken
      });
  
    } catch (error) {
        next(error)
    }
}