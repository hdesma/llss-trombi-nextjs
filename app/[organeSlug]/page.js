import { getOrganeFromAlias, getMembresFromOrganeId } from "@/lib/organe";
import Grid from "@/components/Grid";
import classes from './page.module.css'
import { Card } from "@/components/Card";

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

    return (
        <div>
            <h1 className={classes.organeHeader}>{organe.nom}</h1>
            <p className={classes.organeDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {organe.id_chef && <div className={classes.organeChef}>
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