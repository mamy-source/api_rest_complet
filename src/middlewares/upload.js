import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)

    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/octet-stream",
        "image/webp"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid image type"), false);
    }
};

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter
});

export default upload;