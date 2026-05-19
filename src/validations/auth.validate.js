import { z } from "zod";

export  const registerSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["HR", "ADMIN", "CANDIDATE"]).default("CANDIDATE"),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})