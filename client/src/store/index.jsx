import React, { createContext, useContext, useReducer } from 'react';
import init from './initialState';

export const StateContext = createContext();

export const StoreProvider = ({ reducer = () => {}, initialState = init, children }) => (
  <StateContext.Provider
    value={useReducer(reducer, initialState)}
  >
    {children}
  </StateContext.Provider>
);

export const useStore = () => useContext(StateContext);
