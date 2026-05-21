import express from "express";
import {
    getUserController,
    updateUsercontroller,
    deleteUserController,
    toggleRoleController
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { allowRole } from "../middlewares/rbac.js";
import { updateUserSchema, roleSchema } from "../validations/user.validate.js";
import { validate } from "../middlewares/validate.js";

const userRoute = express.Router();

userRoute.get("/", auth, allowRole("ADMIN", "HR"), getUserController);
userRoute.patch("/update/:id", auth,validate(updateUserSchema), allowRole("ADMIN", "HR"), updateUsercontroller);
userRoute.delete("/delete/:id", auth, allowRole("ADMIN", "HR"), deleteUserController);
userRoute.patch("/role/:id", auth,validate(roleSchema), allowRole("ADMIN"), toggleRoleController);


export default userRoute;