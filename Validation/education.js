const validator=require('validator');
const isEmpty =require('./isEmapty');
module.exports=function validationEducationInput(data){
    const errors={};
    // data.name=isEmpty(data.name)?'':data.name;
    data.school=isEmpty(data.school)?'':data.school;
    data.degree=isEmpty(data.degree)?'':data.degree;
    data.fieldofstudy=isEmpty(data.fieldofstudy)?'':data.fieldofstudy;
    data.from=isEmpty(data.from)?'':data.from;
    // data.from=isEmpty(data.from)?'':data.from;
    // data.from=isEmpty(data.from)?'':data.from;
    // data.password2=isEmpty(data.password2)?'':data.password2;

    // if(!validator.isLength(data.name,{min:2,max:30})){
    //     errors.name='Name Must Be Between 2 And 30 Characters'
    // }
    // if(validator.isEmpty(data.name)){
    //     errors.name="Name Field Is Required"
    // } 
    if(validator.isEmpty(data.school)){
        errors.school="School Field Is Required"
    } 
    // if(!validator.isEmail(data.email)){
    //     errors.email="E-mail Is Invalid"
    // }
    if(validator.isEmpty(data.degree)){
        errors.degree="Degree Field Is Required"
    }   
    // if(!validator.isLength(data.password,{min:4,max:50})){
    //     errors.password="Password Must Be At Least 4 Charecters "
    // }  
    if(validator.isEmpty(data.from)){
        errors.from="From Date Field Is Required"
    } 
    if(validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy="Field Of Study Field Is Required"
    } 
    // if(!validator.equals(data.password,data.password2)){
    //     errors.password="Passwords Must Match"
    // } 
    return{
        errors,
        isValid:isEmpty(errors)
    };
}