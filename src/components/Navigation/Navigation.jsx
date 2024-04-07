import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import css from './Navigation.module.css'

const currentPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.isCurrent)
}
export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={currentPage}>
        Home
      </NavLink>
      <NavLink to="/movies" className={currentPage}>
        Movies
      </NavLink>
    </nav>
  )
}
