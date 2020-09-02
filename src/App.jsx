import React, { useEffect, useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { store } from './config/StateProvider'
import axios from 'axios'
import MoviePage from './Components/MoviePage/MoviePage.jsx';
import MovieList from './Components/MovieList/MovieList';


function App() {
  const { state, dispatch } = useContext(store)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const baseURL = "https://api.themoviedb.org/4/list/1?page=" + state.currPage + "&api_key=" + process.env.REACT_APP_API + "&sort_by=release_date.asc"

  useEffect(() => {
    dispatch({ type : 'loading', loading : true})
    axios.get(baseURL, { headers : {
      'Authorization' : 'Bearer ' + process.env.REACT_APP_ACCESS
    }}).then(res => {
      dispatch({ type : 'fetch', movies : res.data.results })
      dispatch({ type : 'loading', loading : false})
    })
  }, [dispatch, baseURL])
  
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <Link to="/"><h1 style={{fontSize : '1.8em', color : '#05B4E3'}}>Movie Grab</h1></Link>
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
