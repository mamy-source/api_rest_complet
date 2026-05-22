import { email } from "zod";
import prisma from "../config/prisma.js";

// create user
export const registerRepository = async (data) => {

    return prisma.user.create({
        data: {
            ...data,

            profile: {
                create: {}
            }
        }
    });

};
//find by email
export const findByEmail = (email) => {
    return prisma.user.findUnique({
        where: {email}
    })
};

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

//counter user
export const userCount = async() =>{
    return prisma.user.count()
};

//get profile
export const getProfileByUserId = async(userId) =>{
    return prisma.profile.findUnique({
        where: {userId},
        include: {user: true}

    })
};

//create profile
export const createProfile = async(data) =>{
    return prisma.profile.create({
        data
    })
};

// update profile
export const updateProfile = async (userId, data) => {

    // update direct mais sécurisé
    return prisma.profile.update({
        where: {
            userId: userId
        },

        data: {
            phone: data.phone,
            avatar: data.avatar
        }
    });
};

//delete profile
export const deleteProfile = async(userId) =>{
    return prisma.profile.delete({
        where: {userId}
    })
}