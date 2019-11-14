import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from './auth';

/**
 * Returns the page to index page if not authenticated
 */
export const PrivateRoute = ({ component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!authenticate()) {
        return <Redirect to='/' />;
      }
      return Component ? <Component {...props} /> : render(props);
    }}
  />
);
