"use client";

// Hooks / Packages
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { onOpen } from "@/redux/modal/alertModalSlice";
import { useAppDispatch } from "@/redux/hooks";

// Components
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/inputs/Input";
import ImageInput from "@/components/ui/inputs/ImageInput";

// Types
import { BillboardFormProps } from "@/types/props";

// Icons
import { Trash } from "lucide-react";

// Data
import { OnSubmitParams, BillboardForm } from "@/types/formValues";
import { billboardInit } from "@/lib/forms/initialValues";
import { billboardSchema } from "@/lib/forms/validationSchemas";

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const pageInit = useMemo(() => {
    if (billboard) {
      return {
        reqMethod: "PATCH",
        reqUrl: `/api/${params.storeId}/billboards/${params.billboardId}`,
        title: "Edit billboard",
        description: "Edit a billboard",
        toastMessage: "Billboard updated",
        action: "Save changes",
      };
    } else {
      return {
        reqMethod: "POST",
        reqUrl: `/api/${params.storeId}/billboards`,
        title: "Create billboard",
        description: "Add a new billboard",
        toastMessage: "Billboard created",
        action: "Create ",
      };
    }
  }, [billboard, params.billboardId, params.storeId]);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: billboardInit(billboard),
      validationSchema: billboardSchema,
      id: "billboard_form",
      onSubmit: async (
        values: BillboardForm,
        { setSubmitting, resetForm }: OnSubmitParams
      ) => {
        await axios({
          method: pageInit.reqMethod,
          url: pageInit.reqUrl,
          data: values,
        })
          .then(response => {
            // OnSuccess

            if (response.status == 200) {
              toast.success(`${pageInit.toastMessage}`);
              router.push(`/${params.storeId}/billboards`);
              router.refresh();
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
  }, [
    billboard,
    router,
    pageInit.toastMessage,
    pageInit.reqUrl,
    pageInit.reqMethod,
    params.storeId,
  ]);

  const deletePayload = useMemo(() => {
    return {
      title: "Are you sure you want to delete this billboard?",
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/${params.storeId}/billboards/${params.billboardId}`,
      successMessage: "Billboard deleted.",
      failMessage:
        "Make sure you removed all the categories using this billboard first.",
      afterRoute: `/${params.storeId}/billboards`,
    };
  }, [params.storeId, params.billboardId]);

  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Heading */}
        <Heading title={pageInit.title} description={pageInit.description} />
        {/* Delete Button */}
        {billboard ? (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => dispatch(onOpen(deletePayload))}
          >
            <Trash className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
      <Separator />
      {/*  */}
      <Formik {...formInit}>
        {({ isSubmitting, resetForm }) => {
          return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Form id={formInit.id} className="w-full space-y-8">
                <ImageInput
                  name="imageUrl"
                  label="Background image"
                  disabled={isSubmitting}
                  multiChoice={false}
                />
                <Input
                  name="label"
                  type="text"
                  label="Label"
                  placeholder="Billboard label"
                  disabled={isSubmitting}
                />

                {/* Buttons */}
                <div className="flex items-center justify-start gap-2">
                  <Button
                    type="submit"
                    className="mt-4"
                    disabled={isSubmitting}
                  >
                    {pageInit.action}
                  </Button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default BillboardForm;
