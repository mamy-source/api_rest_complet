
import prisma from "../config/prisma.js";

//create user
export const registerRepository = async (data)=> {
    return prisma.user.create({data});

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


