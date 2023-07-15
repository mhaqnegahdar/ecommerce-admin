"use client";
// Hooks / Packages
import { Provider } from "react-redux";
import store from "@/redux/store";

// Types
import { ChildrenProps } from "@/types/props";

const StoreProvider = ({ children }: ChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
