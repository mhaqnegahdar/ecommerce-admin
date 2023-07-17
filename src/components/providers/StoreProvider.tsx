"use client";
// Hooks / Packages
import { Provider } from "react-redux";
import store from "@/redux/store";

// Types
import { ContainerProps } from "@/types/props";

const StoreProvider = ({ children }: ContainerProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
