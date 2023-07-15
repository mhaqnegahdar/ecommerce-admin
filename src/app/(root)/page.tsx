"use client";

// Hooks / Packages
import Image from "next/image";
import { selectIsOpen, onOpen, onClose } from "@/redux/modal/storeModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Components
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
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

  return (
    <main>
      <div className="p-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
}
