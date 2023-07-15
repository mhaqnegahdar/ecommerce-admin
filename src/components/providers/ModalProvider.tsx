"use client";

// Hooks/ Packages
import { useState, useEffect } from "react";

// Components
import StoreModal from "@/components/modals/StoreModal";

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
    </>
  );
};

export default ModalProvider;
