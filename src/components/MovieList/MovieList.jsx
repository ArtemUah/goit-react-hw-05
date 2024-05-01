import { Link, useLocation } from "react-router-dom"

export default function MovieList ({list}) {
  const location = useLocation()
    return(<ul>
        {list.map(movie=> {
            return (<li key={movie.id}><Link to={`/movies/${movie.id}`} state={location} >{movie.title}</Link></li>)
        })}
    </ul>)
}