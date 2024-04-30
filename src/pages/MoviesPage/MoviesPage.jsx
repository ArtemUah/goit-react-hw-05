import { FaSearch } from "react-icons/fa";
import css from '../MoviesPage/MoviesPage.module.css'
import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { Link } from "react-router-dom";

export default function MoviesPage () {
    const [value, setValue] = useState('')
    const [searchMovies, setSearchMovies]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
   
    
        async function getSearchMovie (newQuery){
            setLoading(true);
            setError(false);
            try {
                const searchMovies = await fetchSearchMovie(newQuery);
                setSearchMovies(searchMovies.data.results);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false)
            }
        };

    return (<div>
        <form className={css.container} onSubmit={(e)=>{
            e.preventDefault();
            getSearchMovie(value);
            e.target.reset();
        }}>
        <input onChange={(e=>{
             setValue(e.target.value)
        })} name='input' type='text' placeholder="search.."/>
        <button type="submit"><FaSearch/></button>
    </form>
            {loading && <b>Is Loading...</b>}
            {error && <b>Error!</b>}
            {searchMovies.length > 0 && <MovieList list={searchMovies}/>}
    </div>
        )
}