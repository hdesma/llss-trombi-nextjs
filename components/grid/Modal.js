import Image from "next/image"
import classes from "./Modal.module.css"

export default function Modal({ onClose, image }) {
    return (
        <div className={classes.modal} onBlur={onClose}>
            <div className={classes.imagebox}>
                <Image src={process.env.NEXT_PUBLIC_PATH+image} alt={"image aggrandie"} fill objectFit="contain" />
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}