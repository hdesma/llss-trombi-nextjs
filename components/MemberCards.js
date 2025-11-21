import Image from "next/image"
import classes from './MemberCards.module.css'

export function MemberCard({ membre }) {

    const nomComplet = `${membre.prenom} ${membre.nom[0]}.`
    return <div className={classes.card}>
        <div className={classes.imagebox}><Image src={membre.image} alt={`Photo ${nomComplet}`} fill objectFit="contain" /></div>
        <h2>{nomComplet}</h2>
    </div>
}