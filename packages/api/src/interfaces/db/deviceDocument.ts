export interface IDeviceBaseDocument {
	firstName: string;
	lastName: string;
	latitude: number;
	longitude: number;
	description?: string;
	parentOrg: string;
	role: string;
	type: string;
	phoneNumber: string;
}

export interface IDeviceDocument extends IDeviceBaseDocument {
	userId: string;
	lastConnection: number;
}
