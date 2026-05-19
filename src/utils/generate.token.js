import jwt from "jsonwebtoken";


export const generateAccessToken = (playload) => {
    return jwt.sign(playload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN});
}

export const generateRefreshToken = (playload)=> {
    return jwt.sign(playload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});
}

export const verifyAccessToken =  (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);

}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}