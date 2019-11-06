import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmtableStateVariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import auth from './auth/index';
import addresses from './addresses/index';

const devMiddleware = composeWithDevTools(
  applyMiddleware(
    thunk,
    reduxImmtableStateVariant()
  )
);
const prodMiddleware = applyMiddleware(thunk);
const middleware = process.env.NODE_ENV === 'development' ? devMiddleware : prodMiddleware;
const rootReducer = combineReducers({
  auth,
  addresses,
});

const store = createStore(
  rootReducer,
  {},
  middleware
);

export default store;
