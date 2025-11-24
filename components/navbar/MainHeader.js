import { getAllDisplayOrganes } from "@/lib/organe";

import classes from './MainHeader.module.css'
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";



export default function MainHeader() {

    const organes = getAllDisplayOrganes();
    return (
        <>
            <header className={classes.headerDesktop}>
                <NavbarDesktop organes={organes} />
            </header>
            <header className={classes.headerMobile}>
                    <NavbarMobile organes={organes} />
            </header>
        </>
    )
}