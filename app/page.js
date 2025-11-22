import styles from "./page.module.css";
import { getAllDisplayOrganes } from "@/lib/organe";
import Grid from "@/components/Grid";

export default function Home() {

	const organes = getAllDisplayOrganes();

	return (
		<main>
			<Grid EntitiesArray={organes} />
		</main>
	);
}
