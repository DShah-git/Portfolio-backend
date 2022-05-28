const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logs = require('./model/log');
const Counts = require('./model/visited');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.DB_CONNECT,()=>console.log('Connected to Database'));


app.get('/',(req,res)=>res.sendFile(__dirname +'/index.html'));
app.get('/test',(req,res)=>res.sendFile(__dirname +'/index.html'));
app.post('/record',async (req,res)=>{
    console.log(req.body);
    var logToSave = new Logs({
        dateTime : req.body.dateTime
    });

    await logToSave.save();

    var getCount  = await Counts.findById("628da27cce40cb326f444082");
    
    getCount.count +=1;

    await getCount.save().then((result) => {
        return res.send(result);
    }).catch((err) => {
        return res.send(err);
    });
    
    
})


app.listen(process.env.PORT || 3000,console.log("Server Running"))