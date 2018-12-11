import React from 'react';
// import {Link} from  'react-router-dom';
import {Link}from 'react-router-dom'
import {connect} from 'react-redux';
import propsType from 'prop-types';
import * as actions from '../../reduxControl/action';
import classnames from 'classnames'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            errors:{}
        }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this)
    }
  
    componentDidMount() {
      if(this.props.auth.userAuth){
        this.props.history.push('/dashboard');
      }
    }  //call this component when reciving new props 
   
  componentWillReceiveProps(nextProps) {
      if(nextProps.auth.userAuth){
        this.props.history.push('/dashboard');
      }
      if(nextProps.errors){
        this.setState({
          errors:nextProps.errors
        });
      }
    }
    
 //handel inputs 
   onChange(event){
    this.setState({
        [event.target.name]:event.target.value
    })
}
onSubmit(event){
   event.preventDefault();
   const userLogin={
       email:this.state.email,
       password:this.state.password
   }
   this.props.userlogin(userLogin);
   
}
    render() { 
      const {errors}=this.state;
        return ( 
        <div className='container'>
        <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">
                    Sign in to your DevConnector account
                  </p>
                  <form  onSubmit={this.onSubmit}>
                    <div className="form-group" onSubmit={this.onSubmit}>
                      <input
                        type="email"
                        className={classnames("form-control form-control-lg",{
                          'is-invalid':errors.email
                        })}
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      {errors.email?<div className='invalid-feedback'>{errors.email}</div>:''}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={classnames("form-control form-control-lg",{
                          'is-invalid':errors.password
                        })}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                       
                      />
                      {errors.password?<div className='invalid-feedback'>{errors.password}</div>:''}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                    <Link to='/' className="btn btn-info btn-block mt-4" >
                      Back
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
       </div>
         );
    }
}
//props validations
Login.propsType={
  userlogin:propsType.func.isRequired,
  errors:propsType.object.isRequired,
  auth:propsType.object.isRequired
}
//get redux state and set it as a props
 const mapStateToProps = (state, ownProps) => {
   return {
     auth:state.auth,
     errors:state.errors
   }
 }
export default connect(mapStateToProps,actions)(Login);