import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage () {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function getTrendingMovies(){
            try {
            setLoading(true);
            const movies = await fetchTrendingMovies();
            setTrendingMovies(movies.data.results)
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getTrendingMovies()
    },[]);

    return(<div>
        <h2>Trending today</h2>
        {error && <b>Error!!!</b>}
        {loading && <b>Loading...</b>}
        {trendingMovies.length > 0 && <MovieList list={trendingMovies}/>}
    </div>)

}