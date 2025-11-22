import { getAllDisplayOrganes } from "@/lib/organe";
import NavLink from "./NavLink";
import classes from './MainHeader.module.css'



export default function MainHeader() {

    const organesNavBar = getAllDisplayOrganes();
    return (
        <>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <ul>
                        <NavLink href="/">Accueil</NavLink>
                        {organesNavBar.map((organe) => {
                            return <NavLink href={organe.alias} key={organe.id}>{organe.short}</NavLink>
                        })}
                    </ul>
                </nav>
            </header>
        </>
    )
}