import React, { useEffect, useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { store } from './config/StateProvider'
import axios from 'axios'
import { apiKey, accessKey } from './config/tmdb'

import MoviePage from './Components/MoviePage/MoviePage.jsx';
import MovieList from './Components/MovieList/MovieList';


function App() {
  const { state, dispatch } = useContext(store)
  const baseURL = "https://api.themoviedb.org/4/list/1?page=" + state.currPage + "&api_key=" + apiKey + "&sort_by=release_date.asc"
  useEffect(() => {
    dispatch({ type : 'loading', loading : true})
    axios.get(baseURL, { headers : {
      'Authorization' : 'Bearer ' + accessKey
    }}).then(res => {
      console.log(res.data)
      dispatch({ type : 'fetch', movies : res.data.results })
      dispatch({ type : 'loading', loading : false})
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <Link to="/"><h1>Movie Grab</h1></Link>
        </nav>
      </header>
      <Switch>
          <Route path='/:id' component={MoviePage} />
          <Route path="/" component={MovieList} />
          
      </Switch>
    </div>
  );
}

export default App;
