import prisma from "../config/prisma.js";

//get all users
export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true
        }
    })
}

//find by Id
export const findById = async(id) => {
    return prisma.user.findUnique({
        where: {id},
        select: {
            fullName: true,
            email: true,
            role: true
        }
    });
};

//update user
export const updateUser = async (userId, data) => {

    const updateData = {};

    if (data.fullName !== undefined) {
        updateData.fullName = data.fullName;
    }

    if (data.email !== undefined) {
        updateData.email = data.email;
    }

    return prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
            id: true,
            fullName: true,
            email: true,
        }
    });
}

//delete user
export const deleteUser = async(userId) => {
    return prisma.user.delete({
        where: {id: userId}
    })
}

//togle role 
export const toggleRole = async(userId, data) =>{
    return prisma.user.update({
        where: {id: userId},
        data: {role: data.role}
    })
}

//counter user
export const userCount = async() =>{
    return prisma.user.count()
};

