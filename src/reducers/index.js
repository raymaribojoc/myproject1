import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { adReducer, selectedAdReducer } from './ad-reducer';
import { authReducer } from './auth-reducer';
import { adMapReducer } from './map-reducer';
import { userBookingsReducer } from './booking-reducer';
import { reducer as formReducer } from 'redux-form';

export const init = () => {
  const reducer = combineReducers({
    ads: adReducer,
    ad: selectedAdReducer,
    form: formReducer,
    auth: authReducer,
    userBookings: userBookingsReducer,
    map: adMapReducer
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
}
