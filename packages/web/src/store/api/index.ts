import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICursor, IDevice, IPaginationBase } from "types";

export const devicesApi = createApi({
	reducerPath: "devicesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/devices`
	}),
	endpoints: (builder) => ({
		getDevice: builder.query<IDevice, string>({
			query: (id) => id
		}),
		getDevices: builder.query<ICursor<IDevice>, IPaginationBase>({
			query: (args) => {
				const params = {
					skip: args.skip
				};
				if (args.limit) {
					params["limit"] = args.limit;
				}
				return {
					url: "",
					params
				};
			}
		})
	})
});

export const { useGetDeviceQuery, useGetDevicesQuery } = devicesApi;
