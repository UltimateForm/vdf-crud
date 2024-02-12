import { IFruit, IProcedure } from "./types";

export function processFruit(
	fruit: IFruit,
	existingProcedure?: IProcedure
): IProcedure {
	const procedure: IProcedure = {
		appliance: [...(existingProcedure?.appliance ?? []), fruit],
		name: existingProcedure?.name ?? "Knife"
	};
	return procedure;
}
