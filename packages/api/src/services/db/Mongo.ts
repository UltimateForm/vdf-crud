import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { IDeviceBaseDocument, IDeviceDocument } from "interfaces/db";
import { ICursor } from "interfaces/models";
import mongoose, { Connection } from "mongoose";

@Injectable()
export class MongoService {
	private Device: mongoose.Model<IDeviceDocument>;
	constructor(@InjectConnection() private connection: Connection) {
		const deviceSchema = new mongoose.Schema<IDeviceDocument>(
			{
				firstName: String,
				lastName: String,
				latitude: Number,
				longitude: Number,
				description: String,
				lastConnection: Number,
				parentOrg: String,
				role: String,
				type: String,
				phoneNumber: String
			},
			{
				virtuals: {
					userId: {
						get() {
							return this._id;
						}
					}
				}
			}
		);
		this.Device = connection.model("Device", deviceSchema);
	}

	private sanitizeDocument(dbData: IDeviceDocument): IDeviceDocument {
		return {
			userId: dbData.userId,
			firstName: dbData.firstName,
			lastName: dbData.lastName,
			latitude: dbData.latitude,
			longitude: dbData.longitude,
			description: dbData.description,
			lastConnection: dbData.lastConnection,
			parentOrg: dbData.parentOrg,
			role: dbData.role,
			type: dbData.type,
			phoneNumber: dbData.phoneNumber
		};
	}

	async getDevice(id: string): Promise<IDeviceDocument> {
		const result = await this.Device.findById(id);
		if (!result) return null;
		return this.sanitizeDocument(result);
	}

	async getDevices(
		limit: number,
		skip: number
	): Promise<ICursor<IDeviceDocument>> {
		const result = await this.Device.find({}, null, { skip, limit });
		const totalCount = await this.Device.countDocuments();
		return {
			limit,
			skip,
			count: result.length,
			totalCount: totalCount,
			items: result.map(this.sanitizeDocument)
		};
	}

	async createDevice(payload: IDeviceBaseDocument): Promise<IDeviceDocument> {
		// todo: this is a no no
		const document = new this.Device({ ...payload });
		document.isNew = true;
		const result = await document.save();
		return this.sanitizeDocument(result);
	}

	async updateDevice(
		payload: Partial<IDeviceDocument>
	): Promise<IDeviceDocument> {
		const result = await this.Device.findByIdAndUpdate(
			payload.userId,
			{ ...payload },
			{ new: true }
		);
		return this.sanitizeDocument(result);
	}

	async deleteDevice(id: string): Promise<void> {
		await this.Device.findByIdAndDelete(id);
	}
}
