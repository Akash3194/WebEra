//DAILY ENTRY SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compBots= new Schema({
    compId:String,
    //entryDate:{type:Date, default:Date.now()},
    expDate:{type:Date,default:Date()},
    tz: Number,
    botId:String,
    })

module.exports=mongoose.model('compBots',compBots);
