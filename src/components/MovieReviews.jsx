import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MovieAPI from "../movies-api";
import { Blocks } from "react-loader-spinner";
import css from "./MovieReviews.module.css";

const movieAPI = new MovieAPI();

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
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
          const data = await movieAPI.getMovieReviews(movieId);
          setMovieReviews(data.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    };

    fetchMovieReviews();
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
      ) : movieReviews.length > 0 ? (
        movieReviews.map((review) => (
          <li key={review.id}>
            <h3 className={css.author}>{review.author}</h3>
            <p className={css.content}>{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews available for this movie</p>
      )}
    </ul>
  );
}
