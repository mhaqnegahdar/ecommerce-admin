"use client";

//Hooks / Packages
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectState, onClose } from "@/redux/modal/alertModalSlice";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

// Component
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

const AlertModal = () => {
  // states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const router = useRouter();

  // Redux
  const dispatch = useAppDispatch();
  const {
    isOpen,
    action,
    title,
    description,
    api,
    successMessage,
    failMessage,
    afterRoute,
  } = useAppSelector(selectState);

  // Actions

  // Delete Store
  const deleteReq = async () => {
    setIsSubmitting(true);
    await axios
      .delete(api)
      .then(response => {
        // OnSuccess

        if (response.status == 200) {
          toast.success(successMessage);
          dispatch(onClose());
          router.refresh();
          router.push(afterRoute);
        }
      })
      .catch(error => {
        //On Error
        toast.error(failMessage);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      title={title}
      description={description}
    >
      {/* Buttons */}
      <div className="pt-6 gap-2 flex items-center justify-end w-full">
        <Button
          type="reset"
          variant={"outline"}
          className="mt-4"
          disabled={isSubmitting}
          onClick={() => {
            dispatch(onClose());
          }}
        >
          Cancel
        </Button>
        <Button
          variant={"destructive"}
          type="submit"
          className="mt-4"
          disabled={isSubmitting}
          onClick={() => (action === "delete" ? deleteReq() : {})}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
