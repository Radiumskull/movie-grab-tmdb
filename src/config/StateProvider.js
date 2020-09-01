import React, {createContext, useReducer} from 'react';

const initialState = {
  currPage : 1,
  currId : 1,
  movies : [],
  loading : false
}
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'fetch':
        return {...state, 
          movies : state.movies.concat(action.movies), 
          currId : state.currId + 1,
          currPage : 1

        };
      case 'loading':
        return {...state, loading : action.loading};
      default:
        return state;
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }