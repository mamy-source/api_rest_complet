import * as userRepo from "../repository/user.repository.js";

//get all users
export const userList = async() =>{
    try {
        const users = await userRepo.getAllUsers();
        return users;
    } catch (error) {
        throw new Error(error);
    }
}

//update user
export const updateUser = async(userId, data) => {
    try {
        const user =  await userRepo.findById(userId);
        if (!user){
            throw new Error("User not found");
        }

        if (!data.fullName && !data.email) {
            throw new Error("No data provided");
        }
        
        const updateUser = await userRepo.updateUser(userId, data);
        return updateUser;
    } catch (error) {
        throw new Error(error);
    }
}

//toggle role
export const toggleRole = async(userId, data) =>{
    try {
        const user =  await userRepo.findById(userId);
        if (!user){
            throw new Error("User not found");
        }
        const newRole = await userRepo.toggleRole(userId, data);
        return newRole;
    } catch (error) {
        
    }
}

//delete user
export const deleteUser = async(userId) =>{
    try {
        const user =  await userRepo.fiindById(userId);
        if(!user) {
            throw new Error("User not found");
        }
        const deleteUser = await userRepo.deleteUser(userId);
        return deleteUser;

    } catch (error) {
        throw new Error(error);
    }
}