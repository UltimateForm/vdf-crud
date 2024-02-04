export interface IPagination {
	limit: number;
	skip: number;
	totalCount: number;
}
export interface ICursor<T> extends IPagination {
	count: number;
	items: T[];
}
