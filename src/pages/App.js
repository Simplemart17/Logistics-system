import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing/index';
import RegisterForm from './Register/index';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/register' component={RegisterForm} />
    </Switch>
  </BrowserRouter>
  );

export default App;
