export interface IDevice {
	userId: string;
	firstName: string;
	lastName: string;
	longitude: number;
	latitude: number;
	description?: string;
	lastConnection: number;
	parentOrg: string;
	role: string;
	type: "user" | "device" | string;
	phoneNumber: string;
}
