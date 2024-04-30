import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import { fetchTrendingMoviesById } from "../../movies-api";
import css from '../MovieDetailsPage/MovieDetailsPage.module.css'
export default function MovieDetailsPage () {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {movieId} = useParams();

    useEffect(()=>{
        setLoading(true);
        async function getSelectedMovie(id) {
            try {
            const movie = await fetchTrendingMoviesById(id);
            setSelectedMovie(movie.data);
            } catch (error) {
                setError(true);
            } finally {setLoading(false)}
        };
        getSelectedMovie(movieId);
    },[movieId])
    return(selectedMovie && <div className={css.container}>
        {loading && <b>Is loading...</b>}
        {error && <b>Error!</b>}
        <p><Link >Go back</Link></p>
        <div className={css.card_container}>
        <img src={`https://image.tmdb.org/t/p/w200/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
        <div>
            <h3>{selectedMovie.title}</h3>
            <p>Userscore: {Math.round(selectedMovie.vote_average*10)}%</p>
            <h4>Overview</h4>
            <p>{selectedMovie.overview}</p>
            <h4>Genres</h4>
            <p>{selectedMovie.genres.map(genre=> genre.name).join(' ')}</p>
        </div>
        </div>
        <div className={css.additional_information_container}>
        <b>Additional information</b>
        <ul>
            <li><Link to='cast'>Cast</Link></li>
            <li><Link to='previews'>Previews</Link></li>
        </ul>
</div>
        <Outlet/>
    </div>)

}