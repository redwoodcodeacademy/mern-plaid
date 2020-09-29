import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/private-route/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logoutUser, setCurrentUser } from './actions/authActions';

function App(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime)
      {
        dispatch(logoutUser());
        props.history.push('/login');
      }
    }
  })
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
