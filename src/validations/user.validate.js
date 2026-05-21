import {z} from "zod";

export const updateUserSchema = z.object({
    fullName: z.string().min(2).optional(),
    email: z.string().email().optional(),
})

export const roleSchema = z.object({
    role: z.enum(["HR", "ADMIN", "CANDIDATE"]).default("CANDIDATE"),
})