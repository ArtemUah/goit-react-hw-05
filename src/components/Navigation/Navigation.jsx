import { NavLink } from "react-router-dom";
import css from '../Navigation/Navigation.module.css'
import clsx from "clsx";
const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

export default function Navigation () {
    return(<nav className={css.container}>
        <NavLink to='/' className={buildLinkClass}>Home</NavLink>
        <NavLink to='/movies'className={buildLinkClass}>Movies</NavLink>
    </nav>)
}