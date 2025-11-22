import Image from "next/image"
import classes from './Card.module.css'
import Link from "next/link"

export function Card({ entity }) {
    let nomComplet = entity.nom
    if (entity.prenom) {
        nomComplet = `${entity.prenom} ${entity.nom[0]}.`
    }

    return <div className={classes.card}>
        {entity.alias ? <Link href={`/${entity.alias}`}>
            <div className={classes.imagebox}>
                <Image src={entity.image} alt={nomComplet ? `Photo ${nomComplet}` : `Photo ${entity.nom}`} fill objectFit="contain" />
            </div>
        </Link> : <div className={classes.imagebox}>
            <Image src={entity.image} alt={nomComplet ? `Photo ${nomComplet}` : `Photo ${entity.nom}`} fill objectFit="contain" />
        </div>}
        <h2>{nomComplet ? nomComplet : entity.nom}</h2>
    </div>
}