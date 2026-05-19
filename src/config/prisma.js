import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import env from "./prisma.js";


const adapter  = new PrismaMariaDb(env.database);
let prisma;

if(!global.prisma){
   prisma = new PrismaClient({adapter});
   if (process.env.NODE_ENV !== "production"){
       global.prisma = prisma;
   }else{
       prisma = global.prisma;
   }
}
export default prisma;
