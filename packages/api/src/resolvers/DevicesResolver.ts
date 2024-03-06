/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { VoidResolver } from "graphql-scalars";
import { IDevice } from "interfaces/models";
import {
	DeviceOutput,
	DeviceCursor,
	PaginationArgs,
	DeviceInput,
	DeviceUpdateInput
} from "interfaces/models/graphql";
import { DevicesService } from "services";

@Resolver((of) => DeviceOutput)
export class DevicesResolver {
	constructor(private readonly devicesService: DevicesService) {}

	// todo: fix return types on this resolver, interface protects us but not completely
	@Query((returns) => DeviceOutput)
	async device(@Args("userId") userId: string): Promise<IDevice> {
		return this.devicesService.getDevice(userId);
	}

	@Query((returns) => DeviceCursor)
	async devices(@Args() args: PaginationArgs) {
		const { limit, skip } = args;
		return this.devicesService.getDevices(limit, skip);
	}

	@Mutation((returns) => DeviceOutput)
	async createDevice(@Args() input: DeviceInput) {
		const device: Omit<IDevice, "userId" | "lastConnection"> = {
			firstName: input.firstName,
			lastName: input.lastName,
			latitude: input.latitude,
			longitude: input.longitude,
			description: input.description,
			parentOrg: input.parentOrg,
			role: input.role,
			type: input.type,
			phoneNumber: input.phoneNumber
		};
		return this.devicesService.createDevice({ ...device });
	}

	@Mutation((returns) => DeviceOutput)
	async updateDevice(@Args() input: DeviceUpdateInput) {
		return this.devicesService.updateDevice({ ...input });
	}

	@Mutation((returns) => VoidResolver, { nullable: true })
	async deleteDevice(@Args("userId") userId: string) {
		await this.devicesService.deleteDevice(userId);
	}
}
