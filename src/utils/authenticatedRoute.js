import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from './auth';

/**
 * Returns the page to login if not authenticated
 */
export const PrivateRoute = ({ component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!authenticate()) {
        return <Redirect to="/login" />;
      }
      return Component ? <Component {...props} /> : render(props);
    }}
  />
);
