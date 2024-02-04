import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICursor, IDevice, IPaginationBase, RequestState } from "types";
import axios from "axios";

export const getDeviceList = createAsyncThunk<
	ICursor<IDevice>,
	IPaginationBase
>("devices/list", async (request, { rejectWithValue }) => {
	try {
		// const apiUrl = process.env.NODE_ENV;
		const apiUrl = "http://localhost:7000";
		const params = {
			skip: request.skip,
		};
		if (request.limit) {
			params["limit"] = request.limit;
		}
		const response = await axios.get<ICursor<IDevice>>(`${apiUrl}/devices`, {
			params,
		});
		const data = response.data;
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export interface IDeviceListState {
	status: RequestState;
	request: IPaginationBase;
	data?: ICursor<IDevice>;
	error?: any;
}

export const deviceListSlice = createSlice({
	name: "deviceList",
	initialState: {
		status: "iddle",
		request: {
			limit: 10,
			skip: 0,
		},
	} as IDeviceListState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getDeviceList.pending, (state, action) => {
			state.status = "pending";
			state.request = action.meta.arg;
		});
		builder.addCase(getDeviceList.fulfilled, (state, action) => {
			state.status = "fulfilled";
			state.data = action.payload;
			state.error = undefined;
		});
		builder.addCase(getDeviceList.rejected, (state, action) => {
			state.status = "rejected";
			state.data = undefined;
			state.error = action.payload;
		});
	},
});

export default deviceListSlice.reducer;
