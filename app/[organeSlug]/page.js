import { MemberCard } from "@/components/MemberCard";
import { getOrganeFromAlias, getMembresFromOrganeId } from "@/lib/organe";

export default async function PageOrgane({ params }) {
    const { organeSlug } = await params;
    const organe = await getOrganeFromAlias(organeSlug)
    const organeRoster = getMembresFromOrganeId(organe.id)
    return (
        <div>
            <h1>{organe.nom}</h1>
            {organeRoster.map((membre) => {
                return <MemberCard key={membre.id} membre={membre}/>
            })}
        </div>
    )
}