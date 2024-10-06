import { useState, useEffect, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import MovieAPI from "../movies-api";
import { Blocks } from "react-loader-spinner";
import css from "./MovieDetailsPage.module.css";

const movieAPI = new MovieAPI();

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const debounceRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const data = await movieAPI.getMovieDetails(movieId);
          setMovieDetails(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <Blocks
        height="160"
        width="160"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{ marginTop: "80px" }}
        visible={true}
      />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={css.container}>
      <Link className={css.back} to={backLinkRef.current}>
        Go back
      </Link>

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

      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className={css.movie}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div className={css.info}>
              <h2>
                {movieDetails.title} ({movieDetails.release_date.split("-")[0]})
              </h2>
              <p className={css.text}>
                User Score: {Math.round(movieDetails.vote_average * 10)}%
              </p>
              <h3>Overview</h3>
              <p className={css.text}>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <p className={css.text}>
                {movieDetails.genres &&
                  movieDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>

          <div className={css.addInfo}>
            <h2>Additional information</h2>
            <nav className={css.addInfoNav}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css["active-link"] : css.link
                }
                to={`/movies/${movieId}/cast`}
              >
                Cast
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css["active-link"] : css.link
                }
                to={`/movies/${movieId}/reviews`}
              >
                Reviews
              </NavLink>
            </nav>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
}
