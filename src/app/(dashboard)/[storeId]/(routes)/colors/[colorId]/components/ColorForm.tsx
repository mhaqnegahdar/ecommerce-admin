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

// Types
import { ColorFormProps } from "@/types/props";

// Icons
import { Trash } from "lucide-react";

// Data
import { OnSubmitParams, ColorForm } from "@/types/formValues";
import { colorInit } from "@/lib/forms/initialValues";
import { colorSchema } from "@/lib/forms/validationSchemas";

const ColorForm = ({ color }: ColorFormProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const pageInit = useMemo(() => {
    if (color) {
      return {
        reqMethod: "PATCH",
        reqUrl: `/api/${params.storeId}/colors/${params.colorId}`,
        title: "Edit color",
        description: "Edit a color",
        toastMessage: "Color updated",
        action: "Save changes",
      };
    } else {
      return {
        reqMethod: "POST",
        reqUrl: `/api/${params.storeId}/colors`,
        title: "Create color",
        description: "Add a new color",
        toastMessage: "Color created",
        action: "Create ",
      };
    }
  }, [color, params.colorId, params.storeId]);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: colorInit(color),
      validationSchema: colorSchema,
      id: "color_form",
      onSubmit: async (
        values: ColorForm,
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
              router.push(`/${params.storeId}/colors`);
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
    color,
    router,
    pageInit.toastMessage,
    pageInit.reqUrl,
    pageInit.reqMethod,
    params.storeId,
  ]);

  const deletePayload = useMemo(() => {
    return {
      title: "Are you sure you want to delete this color?",
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/${params.storeId}/colors/${params.colorId}`,
      successMessage: "Color deleted.",
      failMessage:
        "Make sure you removed all the products using this color first.",
      afterRoute: `/${params.storeId}/colors`,
    };
  }, [params.storeId, params.colorId]);

  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Heading */}
        <Heading title={pageInit.title} description={pageInit.description} />
        {/* Delete Button */}
        {color ? (
          <Button
            variant={"destructive"}
            color={"icon"}
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
                  placeholder="Color name"
                  disabled={isSubmitting}
                />

                <Input
                  name="value"
                  type="color"
                  label="Value"
                  placeholder="Color value"
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

export default ColorForm;
