import axios from "axios";



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZiY2VjYmIxMDY3ODYzMGI2YjUzNzIwMzc0NjQ3YiIsInN1YiI6IjY1NmRmNTQ0YTdlMzYzMDEzYWRlNTBhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3hIc4b7lXiWMJXuNH_eBllGQI3WMxezvg0eJeQpG73M'
    }
  };
  

export async function fetchTrendingMovies() { 
  const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  const data = await axios.get(trendingUrl, options);
  return data;
 }

 export async function fetchTrendingMoviesById(id) { 
  const urlById = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const data = await axios.get(urlById, options);
  return data;
}

 export async function fetchCast(id) { 
  const urlById = `https://api.themoviedb.org/3/movie/${id}/credits`
  const data = await axios.get(urlById, options);
  return data;
}

export async function fetchReviews (id) {
  const urlReviewsById = `https://api.themoviedb.org/3/movie/${id}/reviews`;
  const data = await axios.get(urlReviewsById, options)
  return data;
}

export async function fetchSearchMovie (searchQuery){
  const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`
  const data = await axios.get(urlSearchMovie, options);
  return data;
}