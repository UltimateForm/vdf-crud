export interface IPaginationBase {
	limit?: number;
	skip: number;
}
export interface IPagination extends IPaginationBase {
	totalCount: number;
}
export interface ICursor<T> extends IPagination {
	count: number;
	items: T[];
}
