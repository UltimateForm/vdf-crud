export interface IDeviceDocument {
	userId: string;
	firstName: string;
	lastName: string;
	latitude: number;
	longitude: number;
	description?: string;
	lastConnection: number;
	parentOrg: string;
	role: string;
	type: string;
	phoneNumber: string;
}
