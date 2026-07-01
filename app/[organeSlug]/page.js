'use server'
import { getOrganeFromAlias, getMembresFromOrganeId, getResponsable } from "@/lib/organe";
import { getDocumentsFromOrganeId } from '@/lib/document';
import Grid from "@/components/grid/Grid";
import classes from './page.module.css'

export async function generateMetadata({ params }) {
    const { organeSlug } = await params;
    const organe = getOrganeFromAlias(organeSlug);
    return {
        title: `LLSS: ${organe.nom}`,
        description: `Trombinoscope ${organe.nom}`,
    }
}

export default async function PageOrgane({ params }) {
    const { organeSlug } = await params;

    const organe = getOrganeFromAlias(organeSlug);
    let organeRoster = getMembresFromOrganeId(organe.id);
    let responsablesRoster = getResponsable(organe.id)
    const responsableId = responsablesRoster.map(responsable => organeRoster.find(membre => membre.id === responsable.id).id)
    let customTitre = "";
    //TODO plus tard, exploiter les autres champs possibles. Pour le moment le usecase est "masculin singulier"
    if (organe.resp_titre !== null) {
        const customTitreArray = organe.resp_titre.split(", ");
        customTitre = customTitreArray[0];
    }
    organeRoster = organeRoster.filter((membre) => {
        return !responsableId.includes(membre.id)
    })
    organeRoster.sort((a, b) => {
        return a.nom.localeCompare(b.nom);
    })

    let documents = getDocumentsFromOrganeId(organe.id)
    return (
        <div>
            <h1 className={classes.organeHeader}>{organe.nom}</h1>
            <div>
                {organe.description &&
                    <p className={classes.organeDescription}>{organe.description}</p>
                }
                {documents.length > 0 &&
                    <div className={classes.organeDocuments}>
                        <h2 className={classes.documentHeader}>Documents disponibles:</h2>
                        <ul className={classes.listeDocuments}>
                            {documents.map((document) => <li key={document.id}>
                                <a href={"/LLSS/llss-trombi-nextjs" + document.path} target="_blank" rel="noopener noreferrer" download>{document.nom}</a> par {document.auteur}
                                {document.description && <p>{document.description}</p>}
                            </li>)}
                        </ul>
                    </div>
                }
            </div>

            {responsablesRoster.length > 0 &&
                <div className={classes.membres}>
                    <h2 className={classes.cardHeader}>{customTitre !== "" ? customTitre : (responsablesRoster.length === 1 ? "Responsable" : "Responsables")}:</h2>
                    <Grid EntitiesArray={responsablesRoster} />
                </div>
            }
            <div className={classes.membres}>
                <h2 className={classes.cardHeader}>{organeRoster.length > 1 ? "Membres" : "Membre"}:</h2>
                <Grid EntitiesArray={organeRoster} />
            </div>
        </div>
    )
}