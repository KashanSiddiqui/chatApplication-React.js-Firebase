import React from 'react';
import { connect } from 'react-redux';
import {
  Router,
  Route
} from 'react-router-dom';
import CustomNavbar from '../components/navbar'
import Signin from '../components/signin'
import Signup from '../components/signup';
import Home from '../components/home';
import history from '../history';

const BasicRouting = (props) => {
  return ( 
    <Router history={history}>
    <div>
        <CustomNavbar />
        {
          (!(props.isLogin)) ? 
          (
            <div>
            <Route exact path="/" component={Signup} />
            <Route path="/signin" component={Signin} />
            </div>
          ) :
          (
            <div>
            <Route path="/home" component={Home} />
            </div>
          )
        }
        </div>
    </Router>
  )
}

function mapStateToProp(state) {
  return ({
    isLogin : state.root.isLogin
  })
}

export default connect(mapStateToProp, null)(BasicRouting);