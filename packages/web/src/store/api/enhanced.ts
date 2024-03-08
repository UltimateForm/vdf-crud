import { api as generatedApi } from "./generated";

export const api = generatedApi.enhanceEndpoints({
	addTagTypes: ["Device", "DevicesList"],
	endpoints: {
		devices: {
			providesTags: (result) =>
				result?.devices?.items
					? [
							...result.devices.items.map((d) => ({
								type: "Device" as const,
								id: d.userId
							})),
							"DevicesList"
						]
					: ["DevicesList"]
		},
		createDevice: {
			invalidatesTags: ["DevicesList"]
		}
	}
});

export const { useCreateDeviceMutation, useDevicesQuery } = api;
