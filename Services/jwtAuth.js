const jwtStrategy=require('passport-jwt').Strategy;
const extractJwt=require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const keys=require('../Config/keys');
const User=mongoose.model('users');
const opts={};
opts.jwtFromRequest=extractJwt.fromAuthHeaderAsBearerToken();//return jwt from header
opts.secretOrKey=keys.jwtSecretKey;

module.exports=function(passport){
    passport.use(new jwtStrategy(opts,function(jwt_payload,done){
        // console.log(jwt_payload);
        //will return current user id
        User
        .findById(jwt_payload.id)
        .then((user) => {
            if(user){
                // console.log(user);
                return done(null,user)
            }else{
                return done(null,false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }));
}
