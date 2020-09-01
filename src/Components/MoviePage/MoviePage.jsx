import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './MoviePage.module.css';
import StarRatings from 'react-star-ratings';
const baseSmallURL = "https://image.tmdb.org/t/p/w500"

const MoviePage = ({ location }) => {
    const baseURL = 'https://api.themoviedb.org/3/movie' + location.pathname + '?api_key=' + process.env.REACT_APP_API + '&language=en-US';
    const [ movie, setMovie ] = useState(null);
    useEffect(() => {
        axios.get(baseURL).then(res => {
            setMovie(res.data)
            console.log(res.data)
        })
    }, [setMovie, baseURL])
    return(
    movie === null ? <div className="loader"></div> : 
    <div className={styles.MoviePage}>
        <header className={styles.header}>
        <img src={baseSmallURL + movie.poster_path} className={styles.headerImage} alt={movie.title}/>
            <div className={styles.headerBody}>
                    <h1 className={styles.movieTitle}>{movie.title}</h1>
                    <h1 className={styles.tagline}>{movie.tagline}</h1>
                    <Genres genres={movie.genres}/>
                    <div className={styles.movieOverview}>
                        <h3 style={{margin : '0px'}}>Overview</h3>
                        <div>{movie.overview}</div>
                        <div style={{marginTop : '8px'}}>
                            <StarRatings
                                rating={movie.vote_average / 2}
                                starDimension="20px"
                                starSpacing="2px"
                                starRatedColor="gold"
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                    </div>

                    <strong className={styles.releaseDate}>Release Date : {movie.release_date}</strong>
            </div>
        </header>
        <div className={styles.movieDetails}>
            <h1>Movie Details</h1>
            <DetailsTable data={movie}/>
        </div>

    </div>)
    }


const Genres = (props) => {
    return(<div className={styles.genreList}>
        { props.genres.map((genre) => {
            return (<div key={genre.name} className={styles.genre}>{genre.name}</div>);
        })}
    </div>
    );
}

const DetailsTable = (props) => {
    const data = props.data
    return(
        <div>
            <TableElem title="Language" value={data.original_language} array={false}/>
            <TableElem title="Adult" value={data.adult ? "Yes" : "No"} array={false}/>
            <TableElem title="Production" value={data.genres} array={true}/>
            <TableElem title="Production Countries" value={data.production_countries} array={true}/>
            <TableElem title="Production Companies" value={data.production_companies} array={true}/>
            <TableElem title="Budget" value={'$' + data.budget} array={false}/>
            <TableElem title="Revenue" value={'$' + data.revenue} array={false}/>
            <TableElem title="Runtime" value={data.runtime + " mins"} array={false}/>
        </div>
    );
}

const TableElem = (props) => {
    let valueString = ""
    if(props.array){
        props.value.forEach(v => {   
            valueString += v.name + ',  '
        })
        valueString = valueString.substring(0, valueString.length - 3)
    } else {
        valueString = props.value;
    }
    return(<div className={styles.movieTable}>
        <div>
            <div className={styles.tableElem}>
                <div className={styles.elemHead}>{props.title}</div>
    <div className={styles.elemData}>{valueString}</div>
            </div>
            <hr className="solid" />
        </div>
        </div>);
}

export default MoviePage;