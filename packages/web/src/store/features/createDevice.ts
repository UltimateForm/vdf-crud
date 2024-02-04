import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IDevice, RequestState } from "types";
import axios from "axios";

export const createDevice = createAsyncThunk<IDevice, IDevice>(
	"devices/create",
	async (request, { rejectWithValue }) => {
		try {
			// const apiUrl = process.env.NODE_ENV;
			const apiUrl = "http://localhost:7000";
			const response = await axios.post<IDevice>(`${apiUrl}/devices`, request);
			const data = response.data;
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export interface ICreateDeviceState {
	status: RequestState;
	request?: IDevice;
	data?: IDevice;
	error?: any;
}

export const createDeviceSlice = createSlice({
	name: "createDevice",
	initialState: {
		status: "iddle",
	} as ICreateDeviceState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createDevice.pending, (state, action) => {
			state.status = "pending";
			state.request = action.meta.arg;
		});
		builder.addCase(createDevice.fulfilled, (state, action) => {
			state.status = "fulfilled";
			state.data = action.payload;
			state.error = undefined;
		});
		builder.addCase(createDevice.rejected, (state, action) => {
			state.status = "rejected";
			state.data = undefined;
			state.error = action.payload;
		});
	},
});

export default createDeviceSlice.reducer;
