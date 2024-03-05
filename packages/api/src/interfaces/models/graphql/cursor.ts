import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { ICursor, IPagination } from "../cursor";
import { Device } from "./device";

@ArgsType()
export class PaginationArgs implements Pick<IPagination, "limit" | "skip"> {
	@Field((type) => Int, { nullable: true, defaultValue: 0 })
	limit: number;

	@Field((type) => Int, { nullable: true, defaultValue: 0 })
	skip: number;
}

@ObjectType()
export class DeviceCursor implements ICursor<Device> {
	@Field((type) => Int)
	count: number;

	@Field((type) => [Device])
	items: Device[];

	@Field((type) => Int)
	limit: number;

	@Field((type) => Int)
	skip: number;

	@Field((type) => Int)
	totalCount: number;
}
