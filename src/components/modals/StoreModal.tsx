"use client";

//Hooks / Packages
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectIsOpen, onClose } from "@/redux/modal/storeModalSlice";

// Component
import Modal from "@/components/ui/Modal";

const StoreModal = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  // States

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      title="Create Store"
      description="Add a new Store to manage your products and categories"
    >
      Future Create Store Form{" "}
    </Modal>
  );
};

export default StoreModal;
