const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        defualt:Date.now()
    },
},{versionKey:false});

module.exports=User=mongoose.model('users',userSchema);

