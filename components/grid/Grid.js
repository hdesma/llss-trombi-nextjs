import { Card } from "./Card";
import classes from './Grid.module.css'

export default function Grid({EntitiesArray}){
    
    return <div className={classes.grid}>
                {EntitiesArray.map((entity) => {
                    return <Card key={entity.id} entity={entity} />
                })}
            </div>
}