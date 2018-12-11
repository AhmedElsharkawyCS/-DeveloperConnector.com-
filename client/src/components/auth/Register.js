import React from 'react';
import {Link,withRouter}from 'react-router-dom'
import propsType from'prop-types';
import  classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '../../reduxControl/action';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this)
    }
    componentDidMount() {
      if(this.props.auth.userAuth){
        this.props.history.push('/dashboard');
      }
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.errors){
        this.setState({errors:nextProps.errors});
      }
    }
    
   //handel inputs change 
   onChange(event){
       this.setState({
           [event.target.name]:event.target.value
       })
   }
   //handel form submiting
   onSubmit(event){
        event.preventDefault();
        const newUser={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }
    this.props.userRegister(newUser,this.props.history); 
    // console.log(this.props.auth) 
   }

    render() { 
        return ( 
            <div className='container'>
            <div className="register">
             <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">
                    Create your DevConnector account
                  </p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={classnames('form-control form-control-lg',{
                            'is-invalid':this.state.errors.name
                        })}
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      {this.state.errors.name?<div className='invalid-feedback'>{this.state.errors.name}</div>:""}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className={classnames('form-control form-control-lg',{
                            'is-invalid':this.state.errors.email
                        })}
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      {this.state.errors.email?<div className='invalid-feedback'>{this.state.errors.email}</div>:""}
                      <small className="form-text text-muted">
                        This site uses Gravatar so if you want a profile image, use
                        a Gravatar email
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={classnames('form-control form-control-lg',{
                            'is-invalid':this.state.errors.password
                        })}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      {this.state.errors.password?<div className='invalid-feedback'>{this.state.errors.password}</div>:""}
                      
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={classnames('form-control form-control-lg',{
                            'is-invalid':this.state.errors.password2
                        })}
                    
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                      />
                      
                      {this.state.errors.password2?<div className='invalid-feedback'>{this.state.errors.password2}</div>:""}
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

Register.propsType={
  userRegister:propsType.func.isRequired,
  auth:propsType.object.isRequired,
  errors:propsType.object.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors:state.errors
  }
}
export default connect(mapStateToProps,actions)(withRouter(Register));//( state ,actions)