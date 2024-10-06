import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MovieAPI from "../movies-api";
import { Blocks } from "react-loader-spinner";
import css from "./MovieCast.module.css";

const movieAPI = new MovieAPI();

export default function MovieCast() {
  const [movieCredits, setMovieCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      setIsLoading(true);
      setError(null);

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 1);

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const data = await movieAPI.getMovieCredits(movieId);
          setMovieCredits(data.cast);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {isLoading ? (
        <Blocks
          height="160"
          width="160"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{ margin: "80px 0" }}
          visible={true}
        />
      ) : error ? (
        <p>{error}</p>
      ) : movieCredits.length > 0 ? (
        movieCredits.map((cast) => (
          <li className={css.card} key={cast.id}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={`Photo of ${cast.name}`}
            />
            <h3>{cast.name}</h3>
            <p>Character: {cast.character}</p>
          </li>
        ))
      ) : (
        <p>Cast information is unavailable</p>
      )}
    </ul>
  );
}
