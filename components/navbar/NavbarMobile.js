'use client'
import Image from "next/image"
import NavLink from "./NavLink"
import { useState } from "react"
import classes from "./NavBarMobile.module.css"

export default function NavbarMobile({ organes }) {
    const [isDisplayed, setIsDisplayed] = useState(true)
    const imagePath = isDisplayed ? "/images/default/burger-menu-open.png" : "/images/default/burger-menu-close.png"
    function toggleMenu() {
        setIsDisplayed(!isDisplayed)
    }

    function handleLoseFocus() {
        if (!isDisplayed) {
            setIsDisplayed(true)
        }
    }
    return <nav className={classes.navMobile} onBlur={handleLoseFocus}>
        <button onClick={toggleMenu}><Image src={imagePath} height="20" width="20" alt="burger menu" /></button>
        {!isDisplayed && <ul>
            <NavLink id="accueil" href="/">Accueil</NavLink>
            {organes.map((organe) => {
                return <NavLink href={organe.alias} id={organe.id} key={organe.id}>{organe.short}</NavLink>
            })}
        </ul>}
    </nav>
}
