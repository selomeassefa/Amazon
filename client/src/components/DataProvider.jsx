import { createContext, useReducer } from "react";
import propTypes from "prop-types";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: propTypes.node.isRequired,
  reducer: propTypes.func.isRequired,
  initialState: propTypes.object.isRequired,
};
