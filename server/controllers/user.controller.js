const multer =  require('multer');
const xlsx = require('xlsx');
const User = require('../models/user.model');
const {generateUniqueId} = require('../utils/genarateId')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Ensuring correct extension
    },
});


const upload = multer({storage})

const bulkRegister = async (req, res, next) => {
    console.log(req.body)
    console.log(req.cookies)
    console.log(req.file)

    try{
        const file = req.file
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Get the file from uploads folder
        const workbook = xlsx.readFile(file.path);
        const worksheet = await workbook.Sheets[workbook.SheetNames[0]];  // Get the first sheet from the uploaded file
        if (!worksheet) {
            return res.status(400).json({ message: 'No data found in the file' });
        }
        const data = xlsx.utils.sheet_to_json(worksheet);   // From that sheet get the data and change them into json and store in an array

        const failed= [];
        const success = [];

        for(const row of data){
            const newUser = {
                firstname: row['First Name'],
                lastname: row['Last Name'],
                email: row['Email'],
                userid: generateUniqueId()
            }
            try{
                await User.create(newUser)
                success.push(newUser)
            }catch(error){
                failed.push({user: newUser, error: error.message})
            }
        }
        res.status(200).json({
            message: 'Successfully registered successfully.',
            successFullUsers: success.length,
            failedUsers: failed.length,
            failedDetails: failed
        });
    }catch(err){
        next(err);
    }
}

const createUser = async (req, res, next)=>{
    console.log(req.body)
    console.log(req.cookies)
}

module.exports = {upload, bulkRegister, createUser};


