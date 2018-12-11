const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    date:{
        type:Date,
        default:Date.now()
    },
    text:{
        type:String,
        required:true
    },
    name:String,
    avatar:String,
    likes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    }],
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        text:{
            type:String,
            required:true
        },
        name:String,
        avatar:String, 
        date:{
            type:Date,
            default:Date.now()
        }
    }]
},{versionKey:false});

module.exports=mongoose.model('post',postSchema);