import React, { createContext, useContext, useReducer } from 'react';
import reducers from 'store/reducers';
import init from './initialState';

export const StateContext = createContext();

export const StoreProvider = ({ reducer = reducers, initialState = init, children }) => (
  <StateContext.Provider
    value={useReducer(reducer, initialState)}
  >
    {children}
  </StateContext.Provider>
);

export const useStore = () => useContext(StateContext);
