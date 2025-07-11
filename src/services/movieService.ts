import axios from "axios";
import type Movie from "../types/movie";

interface MovieResponse {
  results: Movie[];
}
export const fetchMovies = async (query:string): Promise<Movie[]>=>{
  
    const token: string = import.meta.env.VITE_TMDB_TOKEN;
    const response = await axios.get< MovieResponse >(`https://api.themoviedb.org/3/search/movie`, {
  params: {
    query:`${query}`
    
  },
  headers: {
    Authorization: `Bearer ${token}`,
  }
}
)

 return response.data.results   
 
}