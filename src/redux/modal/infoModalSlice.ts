import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Types
import { InfoModalPayload, ModalState } from "@/types/states";
import { Movie } from "@prisma/client";

// Define the initial state using that type
const initialState = {
  isOpen: false,
  movie: {} as Movie,
  currentUser: null,
} as ModalState;

export const infoModal = createSlice({
  name: "infoModal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<InfoModalPayload>) => {
      state.isOpen = true;
      state.movie = action.payload.movie;
      state.currentUser = action.payload.currentUser;
      state.currentUser = action.payload.currentUser;
    },
    onClose: state => {
      state.isOpen = false;
      state.movie = {} as Movie;
      state.currentUser = null;
    },
  },
});

export const { onOpen, onClose } = infoModal.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.infoModal.isOpen;
export const selectMovie = (state: RootState) => state.infoModal.movie;
export const selectCurrentUser = (state: RootState) =>
  state.infoModal.currentUser;

export default infoModal.reducer;
