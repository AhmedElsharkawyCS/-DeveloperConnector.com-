import React from 'react';
import{Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import propsType from'prop-types'
import * as actions from '../../reduxControl/action'
// import actions from './../auth/Register';
class Navbar extends React.Component {
  userWillLogout(e){
    e.preventDefault();
    this.props.userLogout();
  }
  componentDidMount() {
    if(!this.props.auth.userAuth){
      this.props.history.push('/');
    }
  }
    render() {
      const{userAuth,user}=this.props.auth;
      //#region 
      const loginUser=(
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href='/'>
            <img
                className='rounded-circle'
               src={user.avatar}
               alt={user.name}
               style={{width:'25px',marginRight:'5px'}}
               title='Gravtar image by Email'
            />{'  '}
            Logout
          </a>
        </li>
      </ul>
      );
      const guestUser=(
        <ul className="navbar-nav ml-auto">
        <li className="nav-item" >
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item" >
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
        );
        //#endregion
        return (
            <div className='fixed'>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              <Link className="navbar-brand" to="/">
                DevConnector
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#mobile-nav"
              >
                <span className="navbar-toggler-icon" />
              </button>
    
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles">
                      {' '}
                      Developers
                    </Link>
                  </li>
                </ul>
                    {userAuth?loginUser:guestUser}
              </div>
            </div>
          </nav>
          </div>
        );
    }
}
Navbar.propsType={
  userLogout:propsType.func.isRequired,
  auth:propsType.object.isRequired
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps,actions)(withRouter(Navbar));