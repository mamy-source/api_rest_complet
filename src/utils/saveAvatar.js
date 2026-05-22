import sharp from "sharp";
import fs from "fs";
import path from "path";

export const saveAvatar = async (file) => {

    if (!file) {
        throw new Error("No file uploaded");
    }

    if (!file.buffer) {
        throw new Error("Invalid file buffer");
    }

    const uploadDir = "uploads/avatars";

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
            recursive: true
        });
    }

    const filename =
        `${Date.now()}-${Math.round(Math.random()*1E9)}.webp`;

    const filepath =
        path.join(uploadDir, filename);

    await sharp(file.buffer)
        .resize(300, 300)
        .webp({ quality: 80 })
        .toFile(filepath);

    return filepath;
};

export const deleteAvatar = (filepath) => {

    if (!filepath) return;

    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
};
