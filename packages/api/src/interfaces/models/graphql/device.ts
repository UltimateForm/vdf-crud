import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Device {
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
}
