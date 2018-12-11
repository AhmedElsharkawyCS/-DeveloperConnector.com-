const express=require('express');
const router=express.Router();
const passport=require('passport');
const Profile=require('../Models/profile');
const User=require('../Models/user');
const validationProfileInput=require('../Validation/profile');
const validationExpInput=require('../Validation/experience');
const validationEduInput=require('../Validation/education');
//get user profile
router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res){
    const errors={};
    //first login and get the currnet user and get id from user object
    Profile
    .findOne({user:req.user.id})
    .then((profile) => {
        if(!profile){
            errors.noprofile='There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
   
    }).catch((err) => {
        console.log(err)
    });
});
//craete profile or edit
router.post('/profile',passport.authenticate('jwt',{session:false}),function(req,res){
   const{errors,isValid}=validationProfileInput(req.body);
    //validate profile form
    if(!isValid){
        return res.status(400).json(errors);
    }

    const profilefields={};
    profilefields.user=req.user.id;
    if(req.body.handel)profilefields.handel=req.body.handel;
    if(req.body.status)profilefields.status=req.body.status;
    if(req.body.company)profilefields.company=req.body.company;
    if(req.body.website)profilefields.website=req.body.website;
    if(req.body.location)profilefields.location=req.body.location;
    if(req.body.bio)profilefields.bio=req.body.bio;
    if(req.body.githubusername)profilefields.githubusername=req.body.githubusername;
    //skills  convert it to array
    if( typeof( req.body.skills)!='undefined'){
        profilefields.skills=req.body.skills.split(',');
    }
    //social >>object of oject
    profilefields.social={};
    if(req.body.youtube)profilefields.social.youtube=req.body.youtube;
    if(req.body.twitter)profilefields.social.twitter=req.body.twitter;
    if(req.body.facebook)profilefields.social.facebook=req.body.facebook;
    if(req.body.linkedin)profilefields.social.linkedin=req.body.linkedin;
    if(req.body.instgram)profilefields.social.instgram=req.body.instgram;
    //find and update
    Profile
    .findOne({user:req.user.id})
    .then((profile) => {
        if(profile){
            // if(JSON.stringify(profilefields)===JSON.stringify(profile)){
                Profile.
                    findOneAndUpdate({user:req.user.id},{$set:profilefields},{new:true})
                    .then(newprofile=>res.json(newprofile));
            // }else{
            //     errors.profile='Same data'
            //     res.status(400).json(errors);
            // }        
                   
        }else{
            //handel check
            Profile.findOne({handel:profilefields.handel}).then((handel) => {
                if(handel){
                    errors.handel='That handel already exists'
                    res.status(400).json(errors);
                }
                //save new profile
                new Profile(profilefields).save().then(newprofile=>res.json(newprofile));
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});
//get profile by handel(username)(anyone can see your profile)/api/profile/handel/:handel
router.get('/profile/handel/:handel',function(req,res){
   const  errors={};
    Profile
   .findOne({handel:req.params.handel})
   .populate('user',['name','avatar'])
   .then((userProfile) => {
       if(!userProfile) {
            errors.noprofile='There is no profile for this user';
           return res.status(404).json(errors);
       } 
       res.json(userProfile);  
   }).catch((err) => {
       console.log(err)
   }); 
});

//get user by id(anyone can see your profile)/api/user/:user_id
router.get('/profile/user/:user_id',function(req,res){
    const  errors={};
    Profile
    .findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then((userProfile) => {
        if(!userProfile) {
             errors.noprofile='There is no profile for this user';
            return res.status(404).json(errors);
        } 
        res.json(userProfile);  
    }).catch((err) => {
        profile='There is no profile for this user';
        res.status(404).json({profile:profile});
    }); 
 });

//get all users 
router.get('/profile/all',function(req,res){
    const  errors={};
    Profile
    .find()
    .populate('user',['name','avatar'])//collect data from all collections
    .then((Profiles) => {
        if(!Profiles) {
             errors.noprofile='There are no profiles';
            return res.status(404).json(errors);
        } 
        res.json(rProfiles);  
    }).catch((err) => {
        profile='There are no profiles';
        res.status(404).json({profile:profile});
    }); 
 });
//add experiences
router.post('/profile/experience',passport.authenticate('jwt',{session:false}),function(req,res){
    // validation
    const {errors,isValid}=validationExpInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Profile
    .findOne({user:req.user.id})
    .then((profile) => {
        const newExp={
            title:req.body.title,
            company:req.body.company,
            location:req.body.location,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //add experience to Exp array
        profile
        .experience
        .unshift(newExp);
        profile.save()
        .then(newProfile=>res.json(newProfile));

    }).catch((err) => {
        profile='There is no profile for this user';
        res.status(404).json({profile:profile});
    });
});
//add education
router.post('/profile/education',passport.authenticate('jwt',{session:false}),function(req,res){
    // validation
    const {errors,isValid}=validationEduInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Profile
    .findOne({user:req.user.id})
    .then((profile) => {
        const newEdu={
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //add education to Exp array
        profile
        .education
        .unshift(newEdu);
        profile.save()
        .then(newProfile=>res.json(newProfile));

    }).catch((err) => {
        profile='There is no profile for this user';
        res.status(404).json({profile:profile});
    });
});
//delete experiences
router.delete('/profile/experience/:exp_id',passport.authenticate('jwt',{session:false}),function(req,res){
    
    Profile
    .findOne({user:req.user.id})
    .then((profile) => {
        const removeIndex=profile.experience.map(collect=>collect.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        //save after deleting
        profile.save().then(newProfile=>res.json(newProfile));
    }).catch((err) => {
        profile='There is no profile for this user';
        res.status(404).json({profile:profile});
    });
});
//delete education
router.delete('/profile/experience/:edu_id',passport.authenticate('jwt',{session:false}),function(req,res){
    
    Profile
    .findOne({user:req.user.id})
    .then((profile) => {
        const removeIndex=profile.education.map(collect=>collect.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        //save after deleting
        profile.save().then(newProfile=>res.json(newProfile));
    }).catch((err) => {
        profile='There is no profile for this user';
        res.status(404).json({profile:profile});
    });
});
//user and profile(delte account)
router.delete('/profile',passport.authenticate('jwt',{session:false}),function(req,res){
    Profile.findOneAndRemove({user:req.user.id}).then(()=>{
       User.findOneAndDelete({_id:req.user.id}).then(()=>{
           res.json({success:true});
       });
    })
});

module.exports=router;