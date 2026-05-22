import express from "express";
import { register, login, refreshToken, profile,
    getProfile, createprofile, updateProfil, deleteProfile
 } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validations/auth.validate.js";
import { validate } from "../middlewares/validate.js";
import { auth } from "../middlewares/auth.js";
import upload  from "../middlewares/upload.js"


const authRouter =  express.Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.get("/profile",auth, getProfile);
authRouter.post("/profile/create", auth, upload.single("avatar"), createprofile),
authRouter.put("/profile/update", auth, upload.single("avatar"), updateProfil),
authRouter.delete("/profile/delete", auth, deleteProfile)
authRouter.post("/refresh-token", refreshToken);

export default authRouter;