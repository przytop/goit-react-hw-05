import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MovieAPI from "../movies-api";
import MovieList from "../components/MovieList";
import { Blocks } from "react-loader-spinner";
import css from "./MoviesPage.module.css";

const movieAPI = new MovieAPI();

export default function MoviesPage() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setSearchedMovies([]);
      return;
    }

    const fetchSearchedMovies = async () => {
      setSearchedMovies([]);
      setHasSearched(false);
      setIsLoading(true);
      setError(null);

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const data = await movieAPI.getSearchMovies(query);
          setSearchedMovies(data.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
          setHasSearched(true);
        }
      }, 500);
    };

    fetchSearchedMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = e.target.elements.query.value.trim();

    if (!input) {
      toast.error("Please enter text to search movie!");
      return;
    }
    setSearchParams({ query: input });
    form.reset();
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && (
        <Blocks
          height="160"
          width="160"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{ marginTop: "60px" }}
          visible={true}
        />
      )}

      {error && <p>{error}</p>}

      {searchedMovies.length > 0 ? (
        <MovieList movies={searchedMovies} />
      ) : (
        !isLoading && hasSearched && <p>No results found</p>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
}
