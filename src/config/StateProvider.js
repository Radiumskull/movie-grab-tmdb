import React, {createContext, useReducer} from 'react';

function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
}

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
        console.log(Date())
        return {...state, 
          movies : arrayUnique(state.movies.concat(action.movies)), 
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