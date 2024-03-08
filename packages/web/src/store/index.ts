import { configureStore } from "@reduxjs/toolkit";
import deviceList from "./features/getDeviceList";
import createDevice from "./features/createDevice";
import { api } from "./api/index";

export const store = configureStore({
	reducer: {
		deviceList,
		createDevice,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
