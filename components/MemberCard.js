import Image from "next/image"

export function MemberCard({membre}){

    const nomComplet = `${membre.prenom} ${membre.nom[0]}.`
console.log(membre.image)
    return <div>
        <h2>{nomComplet}</h2>
        <div><Image src={membre.image} alt={`Photo ${nomComplet}`} width={50} height={50} /></div>
    </div>
}