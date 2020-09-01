import React from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import styles from './MovieCard.module.css'


const MovieCard = (props) => {
    const baseURL = "https://image.tmdb.org/t/p/w500"
    return(
        <div className={styles.movieCard}>
            <div className={styles.cardImage}>
                <img src={baseURL + props.image} alt="placeholder"/>
            </div>
            <div className={styles.cardBody}>
                <h3>{props.title}</h3>
                <div className={styles.rating}>
                    <StarRatings
                        rating={props.rating % 5}
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        />
                </div>
                <div style={{flex : '2'}}><h4 style={{margin : '0px'}}>Overview</h4><p>{props.overview}</p></div>
                <Link to={props.id.toString()} className={styles.tapButton}><div >Tap Here</div></Link>

            </div>

        </div>
        
    )

}


export default MovieCard;