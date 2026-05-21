import * as userService from "../services/user.service.js";


//get  all users
export const getUserController = async(req, res, next) =>{
    try {
        const userList = await userService.userList(req.query.fullName, req.query.email, req.query.role);
        res.status(200).json({message: "All Users", userList});
    } catch (error) {
        next(error)
    }
}

//update user
export const updateUsercontroller = async(req, res, next) =>{
    try {
        const userId = req.params.id;
        const userUpdate = await userService.updateUser(userId, req.body);
        res.status(201).json({message: "User updtate successfully", userUpdate});

    } catch (error) {
        next(error);
    }

}

//toggle role
export const toggleRoleController = async(req, res, next) =>{
    try {
        const userId = req.params.id;
        const newRole = await userService.toggleRole(userId, req.body);
        res.status(201).json({message: "Rôle change successfully", newRole})
    } catch (error) {
        next(error);
    }
}

//delete user
export const deleteUserController = async(req, res, next) =>{
    try {
        const userId = req.params.id;
        const deleteUser = await userService.deleteUser(userId);
        res.status(200).json({message: "User deleted successfully", deleteUser});
    } catch (error) {
        next(error)
    }
}