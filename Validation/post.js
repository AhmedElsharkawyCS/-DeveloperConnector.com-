const validator=require('validator');
const isEmpty =require('./isEmapty');
module.exports=function validationloginInput(data){
    const errors={};
    // data.name=isEmpty(data.name)?'':data.name;
    data.text=isEmpty(data.text)?'':data.text;
    // data.name=isEmpty(data.name)?'':data.name;
    // data.text=isEmpty(data.text)?'':data.text;
    // data.text=isEmpty(data.text)?'':data.text;
    // data.password2=isEmpty(data.password2)?'':data.password2;

    if(!validator.isLength(data.text,{min:2,max:500})){
        errors.text='Name Must Be Between 2 And 500 Characters'
    }
    // if(validator.isEmpty(data.name)){
    //     errors.name="Name Field Is Required"
    // } 
    if(validator.isEmpty(data.text)){
        errors.textemail="Text Field Is Required"
    } 
    // if(!validator.isEmail(data.email)){
    //     errors.email="E-mail Is Invalid"
    // }
    // if(validator.isEmpty(data.password)){
    //     errors.password="Password Field Is Required"
    // }   
    // if(!validator.isLength(data.password,{min:4,max:50})){
    //     errors.password="Password Must Be At Least 4 Charecters "
    // }  
    // if(validator.isEmpty(data.password2)){
    //     errors.password2="Confirm Password Field Is Required"
    // } 
    // if(!validator.equals(data.password,data.password2)){
    //     errors.password="Passwords Must Match"
    // } 
    return{
        errors,
        isValid:isEmpty(errors)
    };
}