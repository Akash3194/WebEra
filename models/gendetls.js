//DAILY ENTRY SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genDetls= new Schema({
    details:{type:String,default:"key"},
    totUsers:{type:Number, default:0},// total no of users registered
    totVer:Number,// total no of verified users
    totBots:{type:Number,default:1000}, // total no of bots available
    });

module.exports=mongoose.model('genDetls',genDetls);
