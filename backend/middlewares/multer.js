import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        console.log('req,file', req, file)
        callback(null, file.originalname)
    }
});

const upload = multer({ storage })

export default upload;