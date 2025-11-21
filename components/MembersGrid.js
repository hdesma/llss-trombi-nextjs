import { MemberCard } from "./MemberCards";
import classes from './MembersGrid.module.css'

export default function MembersGrid({organeRoster}){

    return <div className={classes.grid}>
                {organeRoster.map((membre) => {
                    return <MemberCard key={membre.id} membre={membre} />
                })}
            </div>
}