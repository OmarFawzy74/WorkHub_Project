
// import multer from 'multer'
// import { nanoid } from 'nanoid';
// import path from 'path'

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //       cb(null, 'uploads/'); // Set the destination folder for uploaded files
// //     },
// //     filename: (req, file, cb) => {
// //       const fileName = Date.now() + '-' + file.originalname;
// //       cb(null, fileName);
// //     },
// //   });



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __dirname +"/upload/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });



// export const upload = multer({ storage: storage });


import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { nanoid } from 'nanoid';
import path from 'path';

// Get the current module's path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'upload'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });