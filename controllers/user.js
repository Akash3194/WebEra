//Add EMAIL and PASS to send email from your Gmail account

//CHANGE LINK FOR DEFAULT LOCALHOST
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/duser");
const compBots = require("../models/compbots");
const botList = require("../models/botlist");
const gendetls = require("../models/gendetls");
const nChats = require("../models/nchats");
const nodemailer = require("nodemailer");
var ejs = require("ejs");
var upload = require("express-fileupload");
var ObjID = require("mongodb").ObjectID;
const express = require("express");
const path = require("path");
var emailOtp = path.join(__dirname, "..", "views/mailotp.ejs");

const sendgridTransport = require("nodemailer-sendgrid-transport");
var uppath = path.join(__dirname, "..", "public/dp/");
var allimgs = path.join(__dirname, "..", "public/allimg/");
const app = express();
app.use(upload());
var transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  }),
);

//IIFE for detecting general details

(function() {
  gendetls.findOne({ details: "key" }).then(gotentry => {
    if (gotentry) {
      console.log("already general details are present");
    } else {
      console.log("need to create It's first time with this new database");
      det = new gendetls({
        details: "key",
        totUser: 0,
        totVer: 0,
        totBots: 1000,
      });
      det.save();
    }
  });
})();

module.exports = {
  /* *** GET ENDPOINTS *** */

  /* login: (req, res) => {
    res.status(200);
  },*/

  getAddBots: (req, res) => {
    gendetls.findOne({ details: "key" }).then(det => {
      val = det.totBots;
    });
    //bot number
    res.status(200).json(val);
  },

  logout: (req, res) => {
    req.logout();
    res.status(200).json({ msg: "Logged out successfully" });
  },

  /* *** POST ENDPOINTS *** */

  register: (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res
          .status(409)
          .json({ err: "User already exists, Try Resetting password" });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          //doj: req.body.doj,
        });

        //otp generator
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 1; i < 6; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        var compId = "";
        for (var i = 1; i < 13; i++) {
          compId += possible.charAt(
            Math.floor(Math.random() * possible.length),
          );
        }
        newUser.compId = Date.now() + compId;
        newUser.otp = text;
        //password generator
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                console.log(`User ${user.name} registered!`);
                res.status(200).json({ user });
                ejs.renderFile(emailOtp, { otp: text }, function(err, data) {
                  if (err) {
                    console.log(err);
                    res.status(403).json({
                      err: "Problem with sending email Contact admin.......",
                    });
                  } else {
                    var mailOptions = {
                      from: '"Bot Era" <SUPPORT>',
                      to: req.body.email,
                      subject: "Bot Era verification",
                      html: data,
                    };
                    transporter.sendMail(mailOptions, function(err, info) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("Message sent: " + info.response);
                      }
                    });
                  }
                });
                console.log(`Otp ${text} send!`);
                //add register
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  verOtp: (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        res.status(404).json({ err: "User not found" });
      } else {
        User.findOne(
          { email: req.body.email },
          { otp: 1, isVerified: 1, _id: 0 },
        ).then(doc => {
          if (doc.otp == req.body.otp) {
            var conditions = { email: req.body.email },
              update = { $set: { isVerified: true } };
            User.findOneAndUpdate(
              conditions,
              update,
              { upsert: true },
              function callback(err) {
                console.log(err);
              },
            );
            console.log("otp verified");
            res.status(200).json({ msg: "Otp verified" });
          } else {
            res.status(403).json({ err: "Incorrect otp Try again" });
          }
        });
      }
    });
  },

  postLogin: (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        res.status(401).json({ err: "User does not exist" });
      } else if (user.isVerified != true) {
        res
          .status(403)
          .json({ err: "Otp not verified Try resetting password" });
      } else {
        console.log("logged in");
        passport.authenticate("local", function(err, user, info) {
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!user) {
            console.log("incorrect");
            return res.status(403).json({ err: "Incorrect password" });
          }
          req.logIn(user, function(err) {
            if (err) {
              console.log(err);
              return next(err);
            }
            res.status(200).json(user);
            console.log("logged");
          });
        })(req, res, next);
        // passport.authenticate("local", {
        //   successRedirect: "/profile",
        //   failureRedirect: "",
        //   failureFlash : true ,
        //   res.json({msg:"Loggedin successfully", user});
        // })(req, res, next);
      }
    });
  },

  genotp: (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        res.status(403).json({ err: "User does not exist" });
      } else {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 1; i < 6; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        ejs.renderFile(emailOtp, { otp: text }, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            var mailOptions = {
              from: '"Bot Era" <SUPPORT>',
              to: req.body.email,
              subject: "Bot Era email verification",
              html: data,
            };
            transporter.sendMail(mailOptions, function(err, info) {
              if (err) {
                console.log(err);
              } else {
                console.log("Message sent: " + info.response);
              }
            });
          }
        });
        var conditions = { email: req.body.email },
          update = { $set: { otp: text } };
        User.findOneAndUpdate(
          conditions,
          update,
          { upsert: true },
          function callback(err) {
            console.log(err);
          },
        );
        console.log(`Otp ${text} send!`);
        res.status(200).json({ msg: "Otp sent" });
      }
    });
  },

  passreset: (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          var conditions = { email: req.body.email },
            update = { $set: { password: hash } };
          User.findOneAndUpdate(
            conditions,
            update,
            { upsert: true },
            function callback(err) {
              console.log(err);
            },
          );
          res
            .status(200)
            .json({ msg: "Password reset successfully. Login to continue" });
        });
      });
    });
  },

  // to be added in routes **********************

  deleteacc: (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      coldUser = user;
      coldUser.save(function(err, coldStr) {
        if (err) {
          res.status(401).json({ err: "Facing issues while deleting account" });
          //call for logout....................
        } else {
          deltUser = user;
          User.deleteOne(user, function(err, result) {
            if (err) {
              res
                .status(401)
                .json({ err: "Facing issues while deleting account" });
            } else {
              res.staus(200).json({ msg: "Account successfully deleted" });
            }
          });
        }
      });
    });
  },

  postAddBots: (req, res) => {
    //take user input and store it in given db
    //bot add to database
    let botCount = 0;
    gendetls.findOne({ details: "key" }).then(gotentry => {
      if (gotentry) {
        botCount = gotentry.totBots;
      } else {
        return res.status(403).json({ err: "Problem with database" });
      }
    });
    const newBot = new botList({
      botNo: botCount,
      botUrl: req.body.botUrl,
      projectId: req.body.projectId,
      keyFilename: req.body.keyFilename,
    });
    (conditions = { details: "key" }), (update = { $inc: { totBots: 1 } });
    newBot.save();
    gendetls.findOneAndUpdate(
      conditions,
      update,
      { upsert: true },
      function callback(err) {
        console.log(err);
        return res.status(403).json({ err: "Problem with database" });
      },
    );
    res.status(200).json({ msg: `Bot Added Successfully with no ${botNo}` });
  },

  //To get request load bot component get specific details and send it to that member
  // "/companies/COMPANY_ID/bots/BOT_ID";
  getBotRep: (req, res) => {
    let userMsg = req.body.userMsg;
    const sessionId = req.body.sessionId; //uuid.v4();
    async function runSample(comp, userMsg, sessionId) {
      let msg = userMsg;
      // A unique identifier for the given session
      //const sessionId = req.body.ssnId;//uuid.v4();
      const projectId = comp.projectId; //project Id local variable
      const kfn = comp.keyFilename; //keyfilename local variable
      // Create a new session
      const sessionClient = new dialogflow.SessionsClient({
        keyFilename: `/keys/${kfn}`,
      });
      const sessionPath = sessionClient.sessionPath(projectId, sessionId);

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: msg,
            // The language used by the client (en-US)
            languageCode: "en-US",
          },
        },
      };
      /* Send request and log result
      const responses = await sessionClient.detectIntent(request);
      //console.log('Detected intent');
      const result = responses[0].queryResult;
      //console.log(`  Query: ${result.queryText}`);
      //console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }*/
      return result.fulfillmentText;
    }

    let compId = req.params.compId;
    let botId = req.params.botId;
    compBots
      .findOne({ compId: compId, _id: botId, service: true })
      .then(comp => {
        let botRes = "";
        if (comp) {
          //sending request to bot for response with this function
          runSample(comp, userMsg, sessionId).then(data => {
            res.status(200).json([{ ssnId, text: data }]);
          });
          botRes = data;
        } else {
          res
            .status(400)
            .json({ err: "This Bot is currently down. Try after some time" });
          botRes = "Error occurred";
        } //store msgs on session ID

        nChats.findOne({ sessionId: sessionId }).then(chatId => {
          if (chatId) {
            var chat = { req: userMsg, res: botRes, tim: Date.now() };
            chatId.chat.push(chat);
            chatId.save();
          } else {
            var chat = new nChats({
              sessionId: sessionId,
              companyId: compId,
              botId: botId,
              tz: req.body.tz,
              chat: [
                {
                  req: userMsg,
                  res: botRes,
                  tim: Date.now(),
                },
              ],
            });
            chat.save();
          }
        });
      });
  },

  purchBot: (req, res) => {
    purchtype = req.body.purchtype;
    let exp = new Date();
    let today = new Date();
    if (purchtype == "demo") {
      exp.setDate(today.getDate + 10);
    } else if (purchtype == "thirty") {
      exp.setDate(today.getDate + 30);
    } else if (purchtype == "sixty") {
      exp.setDate(today.getDate + 30);
      exp.setDate(today.getDate + 30);
    } else {
      exp.setDate(today.getDate + 30);
      exp.setDate(today.getDate + 30);
      exp.setDate(today.getDate + 30);
    }
    //find one bot from bot list with dirty=false and inUse=false change it to true
    //then insert the demanding company id in compId field and finally create a entry in compBots
    botList.findOne({ dirty: false, inUse: false }),
      function(err, sBot) {
        sBot.inUse = true;
        sBot.compId = req.body.compId;
        sBot.save();
        if (err) {
          console.log(err, "error while assigning bots");
          res.status(400).json({ err: "Problem while assigning bot" });
        } else {
          //give code to user and file for them to download with key
          //create new entry in compBots
          const assign = new compBots({
            compId: req.body.compId,
            tz: req.body.tz,
            expDate: exp,
            botId: sBot._id,
          });
          assign.save();
        }
      };
  },
  //getBuyBot:(req,res)=>{}
  //extSubscription:(req,res)=>{)=>{}choose pack pay and recieve}
  //To post th

  // Finish

  // Route to get user profile
  getProfile: (req, res) => {
    User.findById(req.params.userId)
      .then(user => {
        res.status(200).json({ user });
      })
      .catch(err => {
        res.status(404).json({ err: "User does not exist" });
      });
  },
};

/**
 * Send a query to the dialogflow agent, and return the query result.

async function runSample(msg, projectId = 'test-adkunn') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename: "/home/bat/Downloads/test-adkunn-1fd6423c1be5.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}*/
/*

// route for chatbot messages
app.post('/send-msg', (req, resp)=>{
  runSample(req.body.message).then(data=>{
    resp.json([{recipient_id: '5', text:data}])
  })
})

function diff_minutes(dtexp, dt1now) 
 {

  var diff =(dtexp.getTime() - dtnow.getTime()) / 1000;
  diff /= (60*60);
  return (Math.round(diff));
  //return Math.abs(Math.round(diff));
  
 }


  }
async verifySubscription(){
  let today= new Date()
  for await (const eachDoc of compBot.find()){
    //convert current to utc compare to its expiry
    let tz=eachDoc.tz;
    let expDate = new Date(eachDoc.expDate)
    hrsRemain =diff_minutes(expDate, today);
    console.log("CHECK Bot no:"+botNo+" CompID:"eachBot.compId+" Remaining Hours:"+hrsRemain)
    if(hrsRemain> 126){
      //HAPPY
    }
    else if(hrsRemain>120){
      //send warning email of 5 days of service left
    }
    else if(hrsRemain>24 && hrsRemain<30){
      //send warning email with hrs of service remaining
    }
    else if(hrsRemain < 0 && hrsRemain > -120){
      //check service to false , disable the bot 
      console.log("XXX Alert for Disable Bot no:"+botNo+" CompID:"eachBot.compId+" Remaining Hours:"+hrsRemain)
    }
    else{
      //remove from compBots ,deassign its bot id , true for dirty , email admin 
      console.log("XXX Alert for removal Bot no:"+botNo+" CompID:"eachBot.compId+" Remaining Hours:"+hrsRemain)
    }
}

//ObjectId("507f191e810c19729de860ea").str
507f191e810c19729de860ea

//one approach
const cursor=User.find().cursor();
for( let doc= await cursor.next();doc!=null;doc = await cursor.next()){
> dat= new Date(new Date().toUTCString())

}

// run server
server.listen(port, () => console.info(`App running on port ${port}`));*/
