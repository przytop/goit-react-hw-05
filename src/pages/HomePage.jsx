import { useState, useEffect, useRef } from "react";
import MovieAPI from "../movies-api";
import MovieList from "../components/MovieList";
import { Blocks } from "react-loader-spinner";
import css from "./HomePage.module.css";

const movieAPI = new MovieAPI();

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const data = await movieAPI.getTrendingMovies();
          setTrendingMovies(data.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.home}>
      <h1 className={css.title}>Trending today</h1>

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
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
}
