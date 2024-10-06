import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.ul}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          <div className={css.imgContainer}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: `${location.pathname}${location.search}` }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster of movie ${movie.title}`}
                className={css.img}
              />
            </Link>
          </div>
          <div>
            <Link
              className={css.title}
              to={`/movies/${movie.id}`}
              state={{ from: `${location.pathname}${location.search}` }}
            >
              {movie.title}{" "}
            </Link>
            <p>{movie.release_date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
