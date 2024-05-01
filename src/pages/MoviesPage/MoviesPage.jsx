import { FaSearch } from "react-icons/fa";
import css from '../MoviesPage/MoviesPage.module.css'
import { useEffect, useMemo, useState } from "react";
import { fetchSearchMovie } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage () {
    const [searchMovies, setSearchMovies]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const [searchParams, setSearchParams]= useSearchParams();
    const searchValue = searchParams.get('query') ?? '';

    function changeSearchValue (newQuery) {
        searchParams.set('query', newQuery);
        setSearchParams(searchParams);
    }
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
            if(searchValue === ''){
                return;
            };
            getSearchMovie(searchValue);
        }, []);

        function onSearch (e) {
            e.preventDefault();
            const searchResult = e.target.elements.input.value;
            if(searchResult.trim() === ''){
                return;
            };
            changeSearchValue(searchResult)
            getSearchMovie(searchResult);
            e.target.reset();
        };

        const filteredSearchMovies = useMemo(()=>{
            return searchMovies;
        },[searchParams, searchMovies]);

    return (<div>
        <form className={css.container} onSubmit={(e)=> onSearch(e)}>
        <input name='input' type='text' placeholder="search.."/>
        <button type="submit"><FaSearch/></button>
    </form>
            {loading && <b>Is Loading...</b>}
            {error && <b>Error!</b>}
            {searchMovies.length > 0 && <MovieList list={filteredSearchMovies}/>}
    </div>
        )
}