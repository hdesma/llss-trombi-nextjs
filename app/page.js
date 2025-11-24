import { getAllDisplayOrganes } from "@/lib/organe";
import Grid from "@/components/grid/Grid";

export default function Home() {

	const organes = getAllDisplayOrganes();

	return (
		<main>
			<Grid EntitiesArray={organes} />
		</main>
	);
}
