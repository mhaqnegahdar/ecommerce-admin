import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Types
import { AlertModalState, AlertModalPayload } from "@/types/states";

// Define the initial state using that type
const initialState = {
  isOpen: false,
  action: "",
  title: "",
  description: "",
  api: "",
  successMessage: "Action completed Successfully",
  failMessage: "Something went wrong!",
  afterRoute: "/",
} as AlertModalState;

export const alertModal = createSlice({
  name: "alertModal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<AlertModalPayload>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.action = action.payload.action;
      state.api = action.payload.api;
      state.successMessage = action.payload.successMessage;
      state.failMessage = action.payload.failMessage;
      state.afterRoute = action.payload.afterRoute;
    },
    onClose: state => {
      state.isOpen = false;
      state.title = initialState.title;
      state.description = initialState.description;
      state.action = initialState.action;
      state.api = initialState.api;
      state.successMessage = initialState.successMessage;
      state.failMessage = initialState.failMessage;
      state.afterRoute = initialState.afterRoute;
    },
  },
});

export const { onOpen, onClose } = alertModal.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectState = (state: RootState) => state.alertModal;

export default alertModal.reducer;
