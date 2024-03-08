import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICursor, IDevice, IPaginationBase } from "types";

export const devicesApi = createApi({
	reducerPath: "devicesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL}/devices`
	}),
	tagTypes: ["Device", "DevicesList"],
	endpoints: (builder) => ({
		getDevice: builder.query<IDevice, string>({
			query: (id) => id,
			providesTags: (result) =>
				result ? [{ type: "Device", id: result.userId }] : ["Device"]
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
			},
			providesTags: (result) =>
				result
					? [
							...result.items.map((d) => ({
								type: "Device" as const,
								id: d.userId
							})),
							"DevicesList"
						]
					: ["DevicesList"]
		}),
		createDevice: builder.mutation<
			IDevice,
			Omit<IDevice, "userId" | "lastConnection">
		>({
			query: (payload) => ({
				url: "/",
				method: "POST",
				body: payload
			}),
			invalidatesTags: ["DevicesList"]
		})
	})
});

export const {
	useGetDeviceQuery,
	useGetDevicesQuery,
	useCreateDeviceMutation
} = devicesApi;
