import { configureStore } from "@reduxjs/toolkit";
import deviceList from "./features/getDeviceList";
import createDevice from "./features/createDevice";
import { devicesApi } from "./api";

export const store = configureStore({
	reducer: {
		deviceList,
		createDevice,
		[devicesApi.reducerPath]: devicesApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(devicesApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
