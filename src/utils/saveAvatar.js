import sharp from "sharp";
import fs from "fs";
import path from "path";


export const saveAvatar = async(file) =>{

    //dossier 
    const uploadDir = "uploads/avatars";
    if(!fs.existsSync(uploadDir)){
        fs.mkdirsync(uploadDir, {recursive: true});
    }
    const filename = `${Date.now()}.webp`;
    const filepath = path.join(uploadDir, filename);

    await sharp(file.buffer)
        .resize(300, 300)
        .webp({quality: 80})
        .toFile(filepath);
    
    return filepath;

};
