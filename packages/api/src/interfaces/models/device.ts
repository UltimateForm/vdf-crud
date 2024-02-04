export interface IDevice {
	userId: string;
	firstName: string;
	lastName: string;
	latitude: number;
	longitude: number;
	description?: string;
	lastConnection: number;
	parentOrg: string;
	role: string;
	type: "user" | "device" | string;
	phoneNumber: string;
}
