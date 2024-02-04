import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { ICursor, IDevice } from "interfaces/models";
import { DevicesService } from "services";

@Controller("devices")
export class DevicesController {
	constructor(private readonly devicesService: DevicesService) {}

	@Get(":userId")
	@HttpCode(200)
	async getDevice(@Param() params: { userId: string }): Promise<IDevice> {
		const userId = params.userId;
		const deviceData = await this.devicesService.getDevice(userId);
		if (!deviceData) throw new NotFoundException();
		return deviceData;
	}

	@Get("/")
	@HttpCode(200)
	async getDevicesList(
		@Query("limit", new ParseIntPipe({ optional: true })) limit: number,
		@Query("skip", new ParseIntPipe({ optional: true })) skip?: number,
	): Promise<ICursor<IDevice>> {
		const list = await this.devicesService.getDevices(limit ?? 0, skip ?? 0);
		return list;
	}

	@Post("/")
	@HttpCode(201)
	async createDevice(@Body() payload: IDevice) {
		const creationResult = this.devicesService.createDevice(payload);
		return creationResult;
	}

	@Patch("/")
	@HttpCode(200)
	async updateDevice(@Body() payload: IDevice) {
		const patchResult = this.devicesService.updateDevice(payload);
		return patchResult;
	}

	@Delete(":userId")
	@HttpCode(204)
	async deleteDevice(@Param() params: { userId: string }): Promise<void> {
		this.devicesService.deleteDevice(params.userId);
	}
}
