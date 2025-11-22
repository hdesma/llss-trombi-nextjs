'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './MainHeader.module.css'

export default function NavLink({ href, id, children }) {
    const path = usePathname()
    return <li key={id}>
        <Link className={(path === `/${href}` || (id === "accueil" && path === `/`) || (`/${id}`===path)) ? classes.active : undefined} href={href}>
            {children}
        </Link>
    </li>

}