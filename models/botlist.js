//DAILY ENTRY SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const botList= new Schema({
    botNo:Number,
    //botIs is deprected with Schema.Types.ObjectId,
    //botId:String,// bot id requested by react
    botUrl:String,//request to main bot
    projectId:String,//projectId to connect with specific bot
    keyFilename:String,//securefileName to connect
    dirty: { type: Boolean, default:false }, // to check if the bot is clean or dirty 
    inUse: { type: Boolean, default: true },
    service: { type: Boolean,default: true}, //to check if the bot is free or busy
    compId: { type: String, default: null }, //company id which is using current bot

    });

module.exports=mongoose.model('nBots',botList);
