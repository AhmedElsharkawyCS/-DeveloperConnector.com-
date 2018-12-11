const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const keys=require('./Config/keys');
const users=require('./Routes/users');
const profiles=require('./Routes/profiles');
const posts=require('./Routes/posts');
const bodyParser=require('body-parser');
const app=express();
const PORT=process.env.PORT||5000;

// connect to databsae
mongoose
.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser:true})//keys.db_UR
.then(() => {
        console.log("W're connected to db");
}).catch((err) => {
    console.log("Authentication Failed OR Connection Error\n");
});

//parse data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//add passport
app.use(passport.initialize());
require('./Services/jwtAuth')(passport);

//add routes
app.use('/api',users);
app.use('/api',profiles);
app.use('/api',posts);


app.listen(PORT,function(){
    console.log("Server Running On Port:"+PORT);
});