import { Args, Query, Resolver } from "@nestjs/graphql";
import { Device } from "interfaces/models/graphql/device";
import { DevicesService } from "services";

@Resolver((of) => Device)
export class DevicesResolver {
	constructor(private readonly devicesService: DevicesService) {}

	@Query((returns) => Device)
	async device(@Args("userId") userId: string) {
		return this.devicesService.getDevice(userId);
	}
}
