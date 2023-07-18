"use client";

// Hooks/ Packages
import { useState, useEffect } from "react";

// Components
import StoreModal from "@/components/modals/StoreModal";
import AlertModal from "@/components/modals/AlertModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
      <AlertModal />
    </>
  );
};

export default ModalProvider;
