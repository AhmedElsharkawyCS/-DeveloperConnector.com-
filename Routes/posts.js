const express=require('express');
const router=express.Router();
const passport=require('passport');
const Post=require('../Models/post');
const Profile=require('../Models/profile');
const postValidation=require('../Validation/post');

//create a new post
router.post('/post',passport.authenticate('jwt',{session:false}),function(req,res){
  //check post field validations
    const {errors,isValid}=postValidation(req.body);
    if(!isValid)
         return  res.status(400).json(errors);
    const newPost=new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    });

    //save new post
    newPost.save().then((post) => {
        res.json(post);
    }).catch((err) => {
        console.log(err);
    });
});

//return all posts
router.get('/posts',function(req,res){
    Post.find()
    .sort({data:-1})
    .then((posts) => {
        if(!posts)
           return res.status(400).json({posts:"Not found"})
        res.json(posts);
    })
    .catch((err) => {
        console.log(err);
    });
});

//retutn single post by id
router.get('/posts/:id',function(req,res){
    Post.findById(req.params.id)
    .then((post) => {
        if(!post)
           return res.status(400).json({post:"Not found"})
        res.json(post);
    })
    .catch((err) => {
        console.log(err);
    });
});

//delete post by id
router.delete('/post/:id',passport.authenticate('jwt',{session:false}),function(req,res){
   Profile.findOne({user:req.user.id})
   .then((profile) => {
     if(profile){
        // console.log('aaaaaaaaaaaaaaaa1')
         Post.findById(req.params.id)
         .then((post) => {
            
             if(post.user.toString()!==req.user.id)
                return res.status(401).json({notauthorized:"User Not Authorized"});
                // console.log('aaaaaaaaaaaaaaaa2')
              post.remove().then(()=>{
                 res.json({success:true});
             }).catch(err=>{
                 res.status(404).json({post:"Not Found"});
             });
         })
     }else{
         res.status(404).json({userprofile:'User profile not found'})
     }
})
.catch((err) => {
    console.log(err);
});
});
//like post
router.post('/post/like/:id',passport.authenticate('jwt',{session:false}),function(req,res){
    var checker=false;
    Profile.findOne({user:req.user.id})
    .then((profile) => {
      if(profile){
          //find actual post to specific
          Post.findById(req.params.id)
          .then((post) => {
            //   res.json();
             if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                 res.status(400).json({alreadyliked:"User already liked this post"});
             }else{
                 post.likes.unshift({user:req.user.id});
                 post.save().then(post=>res.json(post));
             }
          });
      }else{
        res.status(404).json({userprofile:'User profile not found'})
    }
 })
 .catch((err) => {
     console.log(err);
 });
 });
 //unlike post
router.post('/post/unlike/:id',passport.authenticate('jwt',{session:false}),function(req,res){
    // var checker=false;
    Profile.findOne({user:req.user.id})
    .then((profile) => {
      if(profile){
          //find actual post to specific
          Post.findById(req.params.id)
          .then((post) => {
            //   res.json();
             if(post.likes.filter(like=>like.user.toString()===req.user.id).length==0){
                 res.status(400).json({notliked:"you not yet liked htis post"});
             }else{
                //  post.likes.unshift({user:req.user.id});
                //  post.save().then(post=>res.json(post));
               //find user how like the post
                const removeIndex=post.likes
                                  .map(item=>item.user.toString())
                                  .indexOf(req.user.id);
             post.likes.splice(removeIndex,1);
             //save after changing
             post.save().then(post=>res.json(post))
             }
          });
      }else{
        res.status(404).json({userprofile:'User profile not found'})
    }
 })
 .catch((err) => {
     console.log(err);
 });
 });

 //add comment to post
 router.post('/post/comment/:id',passport.authenticate('jwt',{session:false}),function(req,res){
    const {errors,isValid}=postValidation(req.body);
    if(!isValid)
         return  res.status(400).json(errors);
    
    Post.findById(req.params.id)
   .then((post) => {
       const newComment={
           name:req.body.name,
           text:req.body.text,
           avatar:req.body.avatar,
           user:req.user.id
       }
    //    if(post.comments.filter(object=>object.user.toString()===req.user.id).length>0){
    //      res.status(400).json({alreadyliked:"User already commented this post"});
    //    }else
        post.comments.unshift(newComment);
        post.save().then(post=>res.json(post));
    //    }

   }).catch((err) => {
    res.status(404).json({post:"Not Found"});
   });
 });

 //remove the comment from the post
 router.delete('/post/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),function(req,res){
    Post.findById(req.params.id)
    .then((post) => {
        
        if(post.comments.filter(object=>object._id.toString()===req.params.comment_id).length===0){
            res.status(400).json({commentexists:" Comment does't exist"});
          }else{
          const removeIndex=post.comments
                                       .map(object=>object._id.toString())
                                       .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex,1);
        post.save().then(post=>res.json(post));
          }
 
    }).catch((err) => {
     res.status(404).json({post:"Not Found"});
    });
  });
module.exports=router;