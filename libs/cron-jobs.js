const cron=require('node-cron');
// 59 23 * * *
var job= cron.schedule("1-10 * * * *",function () {
    //fun1();//check for every bots expiry date //remove demo bots and 
    //mark them dirty inform client 3 days earlier and inform admin to reclean it
    //fun2();//choose to notify
    console.log("job every day at midnight");
});

job.start()

module.export=job;

