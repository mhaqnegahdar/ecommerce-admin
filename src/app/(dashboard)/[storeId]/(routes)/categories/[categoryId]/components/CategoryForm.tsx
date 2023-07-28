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
import { CategoryFormProps } from "@/types/props";

// Icons
import { Trash } from "lucide-react";

// Data
import { OnSubmitParams, CategoryForm } from "@/types/formValues";
import { categoryInit } from "@/lib/forms/initialValues";
import { categorySchema } from "@/lib/forms/validationSchemas";

const CategoryForm = ({ category, billboards }: CategoryFormProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const formattedBillboards = billboards?.map(({ id, label }) => {
    return { value: id, label };
  });

  const pageInit = useMemo(() => {
    if (category) {
      return {
        reqMethod: "PATCH",
        reqUrl: `/api/${params.storeId}/categories/${params.categoryId}`,
        title: "Edit category",
        description: "Edit a category",
        toastMessage: "Category updated",
        action: "Save changes",
      };
    } else {
      return {
        reqMethod: "POST",
        reqUrl: `/api/${params.storeId}/categories`,
        title: "Create category",
        description: "Add a new category",
        toastMessage: "Category created",
        action: "Create ",
      };
    }
  }, [category, params.categoryId, params.storeId]);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: categoryInit(category),
      validationSchema: categorySchema,
      id: "category_form",
      onSubmit: async (
        values: CategoryForm,
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
              router.push(`/${params.storeId}/categories`);
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
    category,
    router,
    pageInit.toastMessage,
    pageInit.reqUrl,
    pageInit.reqMethod,
    params.storeId,
  ]);

  const deletePayload = useMemo(() => {
    return {
      title: "Are you sure you want to delete this category?",
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/${params.storeId}/categories/${params.categoryId}`,
      successMessage: "Category deleted.",
      failMessage:
        "Make sure you removed all the products using this category first.",
      afterRoute: `/${params.storeId}/categories`,
    };
  }, [params.storeId, params.categoryId]);

  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Heading */}
        <Heading title={pageInit.title} description={pageInit.description} />
        {/* Delete Button */}
        {category ? (
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
                  placeholder="Category name"
                  disabled={isSubmitting}
                />
                <SelectInput
                  name="billboardId"
                  label="Select a billboard"
                  data={formattedBillboards || []}
                  defaultValue={
                    formattedBillboards ? formattedBillboards[0].value : ""
                  }
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

export default CategoryForm;
