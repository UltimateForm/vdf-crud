/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ArgsType,
	Field,
	Float,
	GraphQLTimestamp,
	ObjectType
} from "@nestjs/graphql";
import { IDevice } from "../device";
import { BigIntResolver } from "graphql-scalars";

@ObjectType()
export class DeviceOutput implements IDevice {
	@Field()
	userId: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	description: string;

	// todo: fix db, this shouldn't be nullable
	@Field((type) => BigIntResolver, { nullable: true })
	lastConnection: number;

	@Field()
	parentOrg: string;

	@Field()
	role: string;

	@Field()
	type: string;

	@Field()
	phoneNumber: string;

	@Field((type) => Float, { nullable: true })
	latitude: number;

	@Field((type) => Float, { nullable: true })
	longitude: number;
}

@ArgsType()
export class DeviceInput implements Omit<IDevice, "userId" | "lastConnection"> {
	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	description: string;

	@Field()
	parentOrg: string;

	@Field()
	role: string;

	@Field()
	type: string;

	@Field()
	phoneNumber: string;

	@Field((type) => Float, { nullable: true })
	latitude: number;

	@Field((type) => Float, { nullable: true })
	longitude: number;
}

@ArgsType()
export class DeviceUpdateInput
	implements Partial<Omit<IDevice, "lastConnection">>
{
	@Field()
	userId: string;

	@Field({ nullable: true })
	firstName?: string;

	@Field({ nullable: true })
	lastName?: string;

	@Field({ nullable: true })
	description?: string;

	@Field({ nullable: true })
	parentOrg?: string;

	@Field({ nullable: true })
	role?: string;

	@Field({ nullable: true })
	type?: string;

	@Field({ nullable: true })
	phoneNumber?: string;

	@Field((type) => Float, { nullable: true })
	latitude?: number;

	@Field((type) => Float, { nullable: true })
	longitude?: number;
}
