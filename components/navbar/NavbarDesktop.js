import NavLink from "./NavLink";
import classes from "./NavBarDesktop.module.css"

export default function NavbarDesktop({ organes }) {

    return <nav className={classes.navDesktop}>

        <ul>
            <NavLink id="accueil" href="/">Accueil</NavLink>
            {organes.map((organe) => {
                return <NavLink href={"llss-trombi-nextjs/"+organe.alias} id={organe.id} key={organe.id}>{organe.short}</NavLink>
            })}
        </ul>
    </nav>
}