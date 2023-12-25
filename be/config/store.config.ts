import { diskStorage } from "multer";

export const storeConfig = (folder: string) => diskStorage({
    destination: `upload/${folder}/`,
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})