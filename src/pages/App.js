import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../utils/authenticatedRoute';
import Landing from './Landing/index';
import Register from './Register/index';
import Login from './Login';
import Addresses from './Addresses';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Couriers from './Couriers';
import Shipments from './Shipments';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/addresses' component={Addresses} />
      <PrivateRoute path='/couriers' component={Couriers} />
      <PrivateRoute path='/shipments' component={Shipments} />
    </Switch>
    <ToastContainer />
  </BrowserRouter>
  );

export default App;
