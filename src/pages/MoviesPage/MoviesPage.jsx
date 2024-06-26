import { FaSearch } from "react-icons/fa";
import css from '../MoviesPage/MoviesPage.module.css'
import { useEffect, useMemo, useState } from "react";
import { fetchSearchMovie } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";

export default function MoviesPage () {
    const [searchMovies, setSearchMovies]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const [searchParams, setSearchParams]= useSearchParams();
    const searchQuery = searchParams.get('query') ?? '';

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

        useEffect(()=>{
            if(searchQuery === ''){
                return;
            };
            getSearchMovie(searchQuery);
        }, [searchQuery]);

        function onSearch (e) {
            e.preventDefault();
            const searchResult = e.target.elements.input.value;
            if(searchResult.trim() === ''){
                return;
            };
            setSearchParams({query:searchResult});
            e.target.reset();
        };

    return (<div>
        <form className={css.container} onSubmit={(e)=> onSearch(e)}>
        <input name='input' type='text' placeholder="search.."/>
        <button type="submit"><FaSearch/></button>
    </form>
            {loading && <b>Is Loading...</b>}
            {error && <b>Error!</b>}
            {searchMovies.length > 0 && <MovieList list={searchMovies}/>}
    </div>
        )
}