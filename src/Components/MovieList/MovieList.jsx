import React, { useContext } from 'react';
import MovieCard from '../MovieCards/MovieCard'
import { store } from '../../config/StateProvider'
import axios from 'axios'
import BottomScrollListener from 'react-bottom-scroll-listener';
  
const MovieList = () => {
    const { state, dispatch } = useContext(store);
    function makeid(length, actual) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += actual
        return result;
     }
    const loadMoreMovies = () => {
    const baseURL = `https://api.themoviedb.org/4/list/${state.currId}?page=` + state.currPage + "&api_key=" + process.env.REACT_APP_API + "&sort_by=release_date.asc"
    dispatch({ type : 'loading', loading : true})
    axios.get(baseURL, { headers : {
        'Authorization' : 'Bearer ' + process.env.REACT_APP_ACCESS
        }}).then(res => {
        dispatch({ type : 'fetch', movies : res.data.results })
        dispatch({ type : 'loading', loading : false})
        }).catch(e => {
            console.error(e)
        })
    }

    return(
            <div style={{display : 'flex', alignItems : 'center', flexDirection : 'column'}}>
                <h1 style={{margin : '.5em'}}>Browse Movies</h1>
            {
                state.movies.map((movie) => {
                    return (<MovieCard key={makeid(10, movie.id)} id={movie.id} title={movie.original_title} image={movie.poster_path} backdrop={movie.backdrop_path} rating={movie.vote_average} overview={movie.overview} release_date={movie.release_date}/>)
                })
            }
            { state.loading ? <div className="loader"></div> : <></>}
            <BottomScrollListener onBottom={() => {
                setTimeout(() => {
                    loadMoreMovies();
                }, 1500)
            }} debounce={1500}/>
        </div>
    )
}

export default MovieList;