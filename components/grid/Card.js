'use client'
import Image from "next/image"
import classes from './Card.module.css'
import Link from "next/link"
import { useState } from "react"
import Modal from "./Modal"
import { createPortal } from "react-dom"

export function Card({ entity, photoResponsable }) {
    const [showModal, setShowModal] = useState(false)
    const isOrgane = !Object.hasOwn(entity, "prenom") 
    let nomComplet = entity.nom
    if (entity.prenom) {
        nomComplet = `${entity.prenom} ${entity.nom[0]}.`
    }
    function handleClick(){
        setShowModal(true);
    }

    return <div className={classes.card} id={photoResponsable ? classes.photoResponsable : undefined}>
        {isOrgane ?
            <Link href={`/${entity.alias}`}>
                <div className={classes.imagebox}>
                    <Image src={"/LLSS/llss-trombi-nextjs"+entity.image} alt={nomComplet ? `Photo ${nomComplet}` : `Photo ${entity.nom}`} fill objectFit="contain" />
                </div>
            </Link> :
            <div className={classes.imagebox} onClick={handleClick}>
                <Image src={"/LLSS/llss-trombi-nextjs"+entity.image} alt={nomComplet ? `Photo ${nomComplet}` : `Photo ${entity.nom}`} fill objectFit="contain" />
            </div>}
        <h2>{nomComplet ? nomComplet : entity.nom}</h2>
        {(showModal && !isOrgane) && createPortal(<Modal onClose={()=> {setShowModal(false)}} image={entity.image} />, document.body)}
    </div>
}