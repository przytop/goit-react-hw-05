import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? css["active-link"] : css.link
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? css["active-link"] : css.link
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
