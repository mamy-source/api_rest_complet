import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

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
        const resultat = await authService.loginService(req.body);

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
}

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