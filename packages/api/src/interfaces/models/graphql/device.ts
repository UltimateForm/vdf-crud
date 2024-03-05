import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { IDevice } from "../device";

@ObjectType()
export class Device implements IDevice {
	@Field()
	userId: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	description: string;

	@Field((type) => Int)
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
