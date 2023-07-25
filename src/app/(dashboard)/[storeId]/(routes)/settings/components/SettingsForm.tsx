"use client";

// Hooks / Packages
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { onOpen } from "@/redux/modal/alertModalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useOrigin } from "@/hooks/useOrigin";

// Components
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/inputs/Input";

// Types
import { SettingsFormProps } from "@/types/props";

// Icons
import { Trash } from "lucide-react";

// Data
import { OnSubmitParams, StoreSettingsForm } from "@/types/formValues";
import { storeSettingsInit } from "@/lib/forms/initialValues";
import { storeSettingsSchema } from "@/lib/forms/validationSchemas";
import ApiAlert from "@/components/ui/ApiAlert";

const SettingsForm = ({ store }: SettingsFormProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const origin = useOrigin();

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: storeSettingsInit(store),
      validationSchema: storeSettingsSchema,
      id: "store_settings_form",
      onSubmit: async (
        values: StoreSettingsForm,
        { setSubmitting, resetForm }: OnSubmitParams
      ) => {
        await axios
          .patch(`/api/stores/${params.storeId}`, values)
          .then(response => {
            // OnSuccess

            if (response.status == 200) {
              router.refresh();
              toast.success(`Store updated successfully!`);
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
  }, [store, params.storeId, router]);

  const deletePayload = useMemo(() => {
    return {
      title: `Are you sure you want to delete "${store.name}" store?`,
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/stores/${params.storeId}`,
      successMessage: "Store deleted successfully.",
      failMessage: "Make sure you removed all products and categories first.",
      afterRoute: `/`,
    };
  }, [store.name, params.storeId]);

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => dispatch(onOpen(deletePayload))}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Formik {...formInit}>
        {({ isSubmitting, resetForm }) => {
          return (
            <Form id={formInit.id} className="w-full space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Input
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="E-commerce"
                  disabled={isSubmitting}
                />
              </div>
              {/* Buttons */}
              <div className="flex items-center justify-start gap-2">
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
