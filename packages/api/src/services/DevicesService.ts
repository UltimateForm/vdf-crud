import { Injectable } from "@nestjs/common";
import { IDevice, IPagination } from "interfaces/models";
import { ICursor } from "interfaces/models";
import { MongoService } from "./db/Mongo";

@Injectable()
export class DevicesService {
	private mongoService: MongoService;

	constructor(mongoService: MongoService) {
		this.mongoService = mongoService;
	}

	async getDevice(userId: string): Promise<any> {
		const device = await this.mongoService.getDevice(userId);
		// todo: this is dangerous, handle mapping
		return device
			? {
					...device
				}
			: null;
	}

	async getDevices(
		limit: IPagination["limit"],
		skip: IPagination["skip"]
	): Promise<ICursor<IDevice>> {
		const result = await this.mongoService.getDevices(limit, skip);
		return result;
	}

	async createDevice(data: IDevice): Promise<IDevice> {
		// todo: this is dangerous, handle mapping
		const timeStampedData: IDevice = {
			...data,
			lastConnection: Date.now()
		};
		const result = await this.mongoService.createDevice(timeStampedData);
		return {
			...result
		};
	}

	async updateDevice(data: Partial<IDevice>): Promise<IDevice> {
		// todo: this is dangerous, handle mapping
		const timeStampedData: Partial<IDevice> = {
			...data,
			lastConnection: Date.now()
		};
		const result = await this.mongoService.updateDevice(timeStampedData);
		return {
			...result
		};
	}

	async deleteDevice(userId: string): Promise<void> {
		await this.mongoService.deleteDevice(userId);
	}
}
