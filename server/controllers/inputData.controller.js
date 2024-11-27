const multer = require('multer');
const xlsx = require('xlsx');
const InputData = require('../models/inputData.model')
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, 'uploads/data/');
    },
    filename: function(req, res, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage})

const bulkInputData = async (req, res, next) =>{
    try{
        const file = req.file

        if(!file){
            return res.status(400).json({message: "No file Uploaded"})
        }

        const workbook = xlsx.readFile(file.path);
        const worksheet = await workbook.Sheets[workbook.SheetNames[0]];
        if(!worksheet){
            return res.status(400).json({message: 'No data found in the file'});
        }
        const data = xlsx.utils.sheet_to_json(worksheet);

        const failed = []
        const success = []

        for(const row of data){
            const newInputData = {
                userid: null,
                transid: row['Transaction Id'],
                transdata: row['Transaction Date'],
                transtime: row['Transaction Time'],
                insttype: row['Inst Type'],
                instnumber: row['Inst Number'],
                transremarks: row['Tansaction Remarks'],
                debit: row['Debit'],
                credit: row['Credit'],
                balance: row['Balance']
            }
            try{
                await InputData.create(newInputData)
                success.push(newInputData)
            }catch(error){
                failed.push({transaction: newInputData, error: error.message})
            }
        }
        res.status(200).json({
            message: 'successfully imported data',
            successFullInserts: success.length,
            failedInserts: failed.length,
            failedDetails: failed
        })
        
    }catch(err){
        next(err);
    }
}   

const createTransaction = async(req, res, next)=>{

}


module.exports = {upload, bulkInputData, createTransaction}