import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../../movies-api";
import css from '../MovieCast/MovieCast.module.css'

export default function MovieCast () {
    const {movieId}= useParams();
    const [movieCast, setMovieCast] = useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    
    useEffect(()=>{
        async function getMovieCast (id) {
            try {
                setLoading(true);
                const cast = await fetchCast(id);
                setMovieCast(cast.data.cast.slice(0,3));
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getMovieCast(movieId)
    }, [movieId])
    return (<div>
        {loading && <b>Is loading...</b>}
        {error && <b>Error!</b>}
        <ul>
            {movieCast.map(movie => {
                return (<li key={movie.id}>
                    <div className={css.container}>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.profile_path}`} alt="" />
                        <div className={css.describe_container}>
                        <p>{movie.name}</p>
                        <p>Character: {movie.character}</p>
                        </div>
                    </div>
                </li>)
            })}
        </ul>
    </div>)
}