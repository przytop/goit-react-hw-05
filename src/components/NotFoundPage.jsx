import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <div className={css.error}>
        <h1 className={css.h1}>404</h1>
        <p>page not found</p>
      </div>
      <button>
        <Link to="/">Go back</Link>
      </button>
    </div>
  );
}
