import { getOrganeFromAlias, getMembresFromOrganeId, } from "@/lib/organe";
import { getDocumentsFromOrganeId } from '@/lib/document'
import Grid from "@/components/grid/Grid";
import { Card } from "@/components/grid/Card";
import classes from './page.module.css'

export default async function PageOrgane({ params }) {
    const { organeSlug } = await params;
    const organe = await getOrganeFromAlias(organeSlug);
    let organeRoster = getMembresFromOrganeId(organe.id);
    let chefOrgane = undefined;
    if (organe.id_chef) {
        chefOrgane = organeRoster.find(membre => membre.id === organe.id_chef);
        organeRoster = organeRoster.filter((membre) => {
            return membre.id !== chefOrgane.id;;
        })
    }
    organeRoster.sort((a, b) => {
        return a.nom.localeCompare(b.nom);
    })

    let documents = getDocumentsFromOrganeId(organe.id)
    return (
        <div>
            <h1 className={classes.organeHeader}>{organe.nom}</h1>
            <div>
                {organe.description && <p className={classes.organeDescription}>{organe.description}</p>}
                {documents.length > 0 && <div className={classes.documents}>
                    <h2>Documents disponibles:</h2>
                    <ul className={classes.listeDocuments}>
                        {documents.map((document) => <li key={document.id}>
                            <a href={document.path} target="_blank" rel="noopener noreferrer" download>{document.nom}</a> par {document.auteur}
                            {document.description && <p>{document.description}</p>}
                        </li>)}
                    </ul>
                </div>}
            </div>

            {organe.id_chef &&
                <div className={classes.organeChef}>
                    {organe.is_cheffe ? <h2>Cheffe:</h2> : <h2>Chef:</h2>}
                    <Card photoChef={true} entity={chefOrgane && chefOrgane} />
                </div>}

            <div className={classes.membres}>
                <h2>Membres:</h2>
                <Grid EntitiesArray={organeRoster} />
            </div>
        </div>
    )
}