import { Args, Query, Resolver } from "@nestjs/graphql";
import { IDevice } from "interfaces/models";
import {
	Device,
	DeviceCursor,
	PaginationArgs
} from "interfaces/models/graphql";
import { DevicesService } from "services";

@Resolver((of) => Device)
export class DevicesResolver {
	constructor(private readonly devicesService: DevicesService) {}

	// todo: fix return types on this resolver, interface protects us but not completely
	@Query((returns) => Device)
	async device(@Args("userId") userId: string): Promise<IDevice> {
		return this.devicesService.getDevice(userId);
	}

	@Query((returns) => DeviceCursor)
	async devices(@Args() args: PaginationArgs) {
		const { limit, skip } = args;
		return this.devicesService.getDevices(limit, skip);
	}
}
