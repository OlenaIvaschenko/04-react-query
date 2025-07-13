import axios from "axios";
import type Movie from "../types/movie";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const token: string = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query,
        // hitsPerPage: 10,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
