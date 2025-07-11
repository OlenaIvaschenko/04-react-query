import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type Movie from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
 
  const[isLoading, setIsLoading] = useState<boolean>(false)


  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  
  };
  const closeModal = () => {
    setSelectedMovie(null);
  }

  

  const handleSearch = async (query: string) => {
    try {
    setIsLoading (true);
    setMovieList([]);
    setError(false);

      const movies = await fetchMovies(query);

      if (movies.length === 0) {
        toast("No movies found for your request.");
       
      }

      setMovieList(movies);
     

    } catch (error) {
      setError(true);
      console.log(error);
    }
    finally {setIsLoading(false)}
  };


  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading&& <Loader/>}
      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelect} movies={movieList} />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </>
  );
}
