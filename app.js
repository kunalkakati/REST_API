const express = require("express");
const bodyParsr = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParsr.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/FFdb", {useUnifiedTopology: true, useUnifiedTopology:true})

const Schema = { 
    short: String,
    full: String
};

const FullFrom = mongoose.model("fullfrom", Schema);

app.route("/full")
.get(function(req,res){
    FullFrom.find((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            res.send(err);
        }
    })
})
.post(function(req,res){
   const newData = new FullFrom ({
       short: req.body.short,
       full: req.body.full
   });

   newData.save((err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send("Successfuly inserted.")
        }
   });
})
.delete(function(req, res){
    FullFrom.deleteMany(function(err){
        if(!err){
            res.send("Successfuly Deleted.")
        }
        else{
            res.send(err);
        }
    });
});


app.route("/full/:name")
.get(function(req,res){
    FullFrom.findOne({short: req.params.name}, (err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            res.send(err);
        }
    });
})
.put(function(req,res){
    FullFrom.update({short: req.params.name}, {short: req.body.short, full: req.body.full}, {overwrite: true}, 
                (err)=>{
                    if(!err){
                        res.send("Successfuly Updated.");
                    }else{
                        res.send(err);
                    }
                });
})
.patch(function(req,res){
    FullFrom.update({short: req.params.name}, { $set: req.body}, (err)=>{
        if(!err){
            res.send("Successfuly Updated");
        }
        else{
            res.send(err);
        }
    });
})
.delete(function(req,res){
    FullFrom.deleteOne({short: req.params.name}, (err)=>{
        if(!err){
            res.send("Successfuly Deleted.");
        }else{
            res.send(err);
        }
    });
});

app.listen(3000, ()=>{
    console.log("Server start on port 3000");
});