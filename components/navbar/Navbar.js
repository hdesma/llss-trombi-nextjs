'use client'
import NavLink from "./NavLink";


export default function Navbar({ organes }) {

    return <ul>
        <NavLink id="accueil" href="/">Accueil</NavLink>
        {organes.map((organe) => {
            return <NavLink href={organe.alias} id={organe.id} key={organe.id}>{organe.short}</NavLink>
        })}
    </ul>

}