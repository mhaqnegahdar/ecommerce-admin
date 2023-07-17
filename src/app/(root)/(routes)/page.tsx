"use client";

// Hooks / Packages
import Image from "next/image";
import { selectIsOpen, onOpen, onClose } from "@/redux/modal/storeModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Components
import { useEffect } from "react";

export default function Home() {
  // Redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [isOpen, dispatch]);

  return null;
}
