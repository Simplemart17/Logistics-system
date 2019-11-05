import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing/index';
import Register from './Register/index';
import Login from './Login';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
    </Switch>
  </BrowserRouter>
  );

export default App;
