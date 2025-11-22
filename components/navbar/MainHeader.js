import { getAllDisplayOrganes } from "@/lib/organe";

import NavLink from "./NavLink";
import classes from './MainHeader.module.css'
import Navbar from "./Navbar";



export default function MainHeader() {

    const organes = getAllDisplayOrganes();
    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <Navbar organes={organes}/>
            </nav>
        </header>
    )
}