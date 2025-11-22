'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './MainHeader.module.css'


export default function NavLink({ href, key, children }) {
    const path = usePathname()

    return <li key={key}>
        <Link /*className={path.startsWith(href) ? `${classes.active} ${classes.link}` : `${classes.link}`}*/ href={href}>
            {children}
        </Link>
    </li>

}