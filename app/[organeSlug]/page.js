import { getOrganeFromAlias, getMembresFromOrganeId } from "@/lib/organe";
import MembersGrid from "@/components/MembersGrid";
import classes from './page.module.css'

export default async function PageOrgane({ params }) {
    const { organeSlug } = await params;
    const organe = await getOrganeFromAlias(organeSlug)
    const organeRoster = getMembresFromOrganeId(organe.id)
    return (
        <div>
            <h1 className={classes.h1}>{organe.nom}</h1>
            <MembersGrid organeRoster={organeRoster}/>
        </div>
    )
}