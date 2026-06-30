'use client'
import Image from "next/image"
import NavLink from "./NavLink"
import { useEffect, useState } from "react"
import classes from "./NavBarMobile.module.css"
import { useRouter } from "next/navigation"
import path from 'path';


export default function NavbarMobile({ organes }) {
    const [isDisplayed, setIsDisplayed] = useState(false)
    const imagePath = isDisplayed ? "/images/default/burger-menu-close.png" : "/images/default/burger-menu-open.png";
    const routeur = useRouter()

    function toggleMenu() {
        setIsDisplayed(!isDisplayed)
    }

    function handleOnBlur(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDisplayed(false)
        }
    }

    return <nav className={classes.navMobile} onBlur={(event) => handleOnBlur(event)}>
        <button onClick={toggleMenu}><Image src={imagePath} height="20" width="20" alt="burger menu" /></button>
        {isDisplayed && <ul>
            <NavLink id="accueil" href="/">Accueil</NavLink>
            {organes.map((organe) => {
                return <NavLink href={organe.alias} id={organe.id} key={organe.id}>{organe.short}</NavLink>
            })}
        </ul>}
    </nav>
}
