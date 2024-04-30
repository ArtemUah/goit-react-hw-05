import axios from "axios";



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZiY2VjYmIxMDY3ODYzMGI2YjUzNzIwMzc0NjQ3YiIsInN1YiI6IjY1NmRmNTQ0YTdlMzYzMDEzYWRlNTBhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3hIc4b7lXiWMJXuNH_eBllGQI3WMxezvg0eJeQpG73M'
    }
  };
  
export default async function fetchCast(id) { 
    const urlById = `https://api.themoviedb.org/3/movie/${id}/credits`
    const data = await axios.get(urlById, options);
    return data;
  }
   