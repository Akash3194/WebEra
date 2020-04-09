//DAILY ENTRY SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nChats= new Schema({
    sessionId:String,
    companyId:String,
    botId:String,
    tz:Number,
    chat:[{
    	req: String,
        res: String,
        tim: {type:Date ,default:Date.now}
    }]
    /*  [{name: String}]  */
    })

module.exports=mongoose.model('nChats',nChats);
