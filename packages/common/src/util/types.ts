export interface IFruit {
	name: string;
	flavor: "bitter" | "sweet" | "acidic";
}

export interface IProcedure {
	name: string;
	appliance: IFruit[];
}
