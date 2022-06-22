import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { defaultReducer, initailState } from './reducer';

const Context = createContext();

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(defaultReducer, initailState);
	const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;

export const useGlobalContext = () => useContext(Context);
