import { configureStore } from "@reduxjs/toolkit";
// Reducers
import storeModalReducer from "./modal/storeModalSlice";
import alertModalReducer from "./modal/alertModalSlice";

const store = configureStore({
  reducer: {
    storeModal: storeModalReducer,
    alertModal: alertModalReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
