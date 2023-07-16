"use client";

//Hooks / Packages
import { useState, useMemo, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectIsOpen, onClose } from "@/redux/modal/storeModalSlice";
import { Form, Formik, FormikProps } from "formik";
import { storeSchema } from "@/lib/forms/validationSchemas";
import { storeInitValues } from "@/lib/forms/initialValues";
import toast from "react-hot-toast";

// Component
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types

const StoreModal = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: storeInitValues,
      validationSchema: storeSchema,
      onSubmit: () => {
        console.log("hi");
      },
      id: "store_form",
    };
  }, []);

  console.log("schema:", storeSchema);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      title="Create Store"
      description="Add a new Store to manage your products and categories"
    >
      <Formik {...formInit}>
        {({ errors, values }) => {
          return (
            <Form>
              <Input name="name" label="Name" placeholder="E-commerce" />
              {/* Buttons */}
              <div className="flex items-center justify-end gap-2">
                <Button type="reset" variant={"outline"} className="mt-4">
                  Cancel
                </Button>
                <Button type="submit" className="mt-4">
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default StoreModal;
