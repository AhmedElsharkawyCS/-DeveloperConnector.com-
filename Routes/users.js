const express=require('express');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const keys=require('../Config/keys');
const router=express.Router();
const User=require('../Models/user');
const validationRegisterInput=require('../Validation/register');
const validationLoginInput=require('../Validation/login');

router.get('/',function(req,res){
    res.status(200).send("hi users");
});

router.post('/users/register',async function(req,res){
//extract to errors and validation from VRI fun
  const{errors,isValid}=validationRegisterInput(req.body);
//   console.log(isValid);
  if(!isValid){
      return res.status(400).json(errors);
  }
    const user=await User.findOne({email:req.body.email});
    if(user){
        errors.email="Email already exists";
        return res.status(400).send(errors);
    }else{
        const avatar= gravatar.url(req.body.email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            avatar:avatar,
            password:req.body.password
            
        });
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
                if(err) throw err;
                newUser.password=hash;
                newUser.save().then((result) => {
                    res.status(200).send(result);
                }).catch((err) => {
                    console.log(err)
                });;
            });
        })
    }
});

//login user
router.post('/users/login',function(req,res){
  const{errors,isValid}=validationLoginInput(req.body);
    //   console.log(isValid);
 if(!isValid){
   return res.status(400).json(errors);
 } 
  const email=req.body.email;
  const password=req.body.password;
  User
  .findOne({email})
  .then((user) => {
      if(!user){
        errors.email="User Not Found";
          return res.status(404).send(errors);
      }
      bcrypt
      .compare(password,user.password)
      .then((isMatch) => {
          if(isMatch){
              //create payload 
              const payload={
                  id:user._id,
                  name:user.name,
                  avatar:user.avatar
              }
               //create user token
               jwt.sign(payload,keys.jwtSecretKey,{expiresIn:24*60*60},function(err,token){
                   res.json({
                       success:true,
                       token:'Bearer '+token
                    });
               });
          }else{
            errors.password="password incorrect";
              return res.status(400).send(errors)
          }
      }).catch((err) => {
          console.log(err)
      });

  }).catch((err) => {
      console.log(err)
  });

});

//curent user
router.get('/users/current',passport.authenticate('jwt',{session:false}),function(req,res){
    res.json({
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    });
});
module.exports=router;