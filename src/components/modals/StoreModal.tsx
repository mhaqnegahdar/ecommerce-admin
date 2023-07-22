"use client";

//Hooks / Packages
import { useState, useMemo, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectIsOpen, onClose } from "@/redux/modal/storeModalSlice";
import { Form, Formik, FormikProps } from "formik";
import { storeSchema } from "@/lib/forms/validationSchemas";
import { storeInit } from "@/lib/forms/initialValues";
import toast from "react-hot-toast";
import axios from "axios";

// Component
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/FormikInput";
import { Button } from "@/components/ui/button";

// Types
import { OnSubmitParams, StoreForm } from "@/types/formValues";

const StoreModal = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: storeInit,
      validationSchema: storeSchema,
      id: "store_form",
      onSubmit: async (
        values: StoreForm,
        { setSubmitting, resetForm }: OnSubmitParams
      ) => {
        await axios
          .post(`/api/stores`, values)
          .then(response => {
            // OnSuccess

            if (response.status == 200) {
              toast.success(`Created ${values.name} store successfully!`);
              resetForm();
              dispatch(onClose());
              // to completely refresh the route
              window.location.assign(`/${response.data.id}`);
            }
          })
          .catch(error => {
            //On Error
            if (error.response.data) {
              toast.error(error.response.data);
            } else {
              toast.error("Somthing went wrong");
            }
          })
          .finally(() => setSubmitting(false));
      },
    };
  }, [dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      title="Create Store"
      description="Add a new Store to manage your products and categories"
    >
      <Formik {...formInit}>
        {({ isSubmitting, resetForm }) => {
          return (
            <Form id={formInit.id}>
              <Input
                name="name"
                label="Name"
                placeholder="E-commerce"
                disabled={isSubmitting}
              />
              {/* Buttons */}
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="reset"
                  variant={"outline"}
                  className="mt-4"
                  disabled={isSubmitting}
                  onClick={() => {
                    resetForm();
                    dispatch(onClose());
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
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
