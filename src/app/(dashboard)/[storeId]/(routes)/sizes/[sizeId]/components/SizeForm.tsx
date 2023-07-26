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
import { SelectInput } from "@/components/ui/inputs/SelectInput";

// Types
import { SizeFormProps } from "@/types/props";

// Icons
import { Trash } from "lucide-react";

// Data
import { OnSubmitParams, SizeForm } from "@/types/formValues";
import { sizeInit } from "@/lib/forms/initialValues";
import { sizeSchema } from "@/lib/forms/validationSchemas";

const SizeForm = ({ size }: SizeFormProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const pageInit = useMemo(() => {
    if (size) {
      return {
        reqMethod: "PATCH",
        reqUrl: `/api/${params.storeId}/sizes/${params.sizeId}`,
        title: "Edit size",
        description: "Edit a size",
        toastMessage: "Size updated",
        action: "Save changes",
      };
    } else {
      return {
        reqMethod: "POST",
        reqUrl: `/api/${params.storeId}/sizes`,
        title: "Create size",
        description: "Add a new size",
        toastMessage: "Size created",
        action: "Create ",
      };
    }
  }, [size, params.sizeId, params.storeId]);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: sizeInit(size),
      validationSchema: sizeSchema,
      id: "size_form",
      onSubmit: async (
        values: SizeForm,
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
              router.push(`/${params.storeId}/sizes`);
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
    size,
    router,
    pageInit.toastMessage,
    pageInit.reqUrl,
    pageInit.reqMethod,
    params.storeId,
  ]);

  const deletePayload = useMemo(() => {
    return {
      title: "Are you sure you want to delete this size?",
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/${params.storeId}/sizes/${params.sizeId}`,
      successMessage: "Size deleted.",
      failMessage: "Make sure you removed all the sizes using this size first.",
      afterRoute: `/${params.storeId}/sizes`,
    };
  }, [params.storeId, params.sizeId]);

  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Heading */}
        <Heading title={pageInit.title} description={pageInit.description} />
        {/* Delete Button */}
        {size ? (
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
                <Input
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="Size name"
                  disabled={isSubmitting}
                />

                <Input
                  name="value"
                  type="text"
                  label="Value"
                  placeholder="Size value"
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

export default SizeForm;
