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
import { ProductFormProps } from "@/types/props";

// Icons
import { Trash } from "lucide-react";

// Data
import { OnSubmitParams, ProductForm } from "@/types/formValues";
import { productInit } from "@/lib/forms/initialValues";
import { productSchema } from "@/lib/forms/validationSchemas";
import { SelectInput } from "@/components/ui/inputs/SelectInput";
import { CheckBoxInput } from "@/components/ui/inputs/CheckBoxInput";

const ProductForm = ({
  product,
  sizes,
  colors,
  categories,
}: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  // Formatted Data for select input
  const formattedCategories = categories?.map(({ id, name }) => {
    return { value: id, label: name };
  });

  const formattedColors = colors?.map(({ id, name }) => {
    return { value: id, label: name };
  });

  const formattedSizes = sizes?.map(({ id, name }) => {
    return { value: id, label: name };
  });

  // Page Initial Data
  const pageInit = useMemo(() => {
    if (product) {
      return {
        reqMethod: "PATCH",
        reqUrl: `/api/${params.storeId}/products/${params.productId}`,
        title: "Edit product",
        description: "Edit a product",
        toastMessage: "Product updated",
        action: "Save changes",
      };
    } else {
      return {
        reqMethod: "POST",
        reqUrl: `/api/${params.storeId}/products`,
        title: "Create product",
        description: "Add a new product",
        toastMessage: "Product created",
        action: "Create ",
      };
    }
  }, [product, params.productId, params.storeId]);

  // States
  const formInit = useMemo(() => {
    return {
      initialValues: productInit(product),
      validationSchema: productSchema,
      id: "product_form",
      onSubmit: async (
        values: ProductForm,
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
              router.push(`/${params.storeId}/products`);
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
    product,
    router,
    pageInit.toastMessage,
    pageInit.reqUrl,
    pageInit.reqMethod,
    params.storeId,
  ]);

  const deletePayload = useMemo(() => {
    return {
      title: "Are you sure you want to delete this product?",
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/${params.storeId}/products/${params.productId}`,
      successMessage: "Product deleted.",
      failMessage: "Something went wrong!",
      afterRoute: `/${params.storeId}/products`,
    };
  }, [params.storeId, params.productId]);

  return (
    <>
      <div className=" flex items-center justify-between">
        {/* Heading */}
        <Heading title={pageInit.title} description={pageInit.description} />
        {/* Delete Button */}
        {product ? (
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
      {/* Form */}
      <Formik {...formInit}>
        {({ isSubmitting, resetForm }) => {
          return (
            <div className="w-full mx-auto md:w-11/12 ">
              <Form
                id={formInit.id}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <Input
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="Product name"
                  disabled={isSubmitting}
                />
                <Input
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="9.99"
                  disabled={isSubmitting}
                />
                <SelectInput
                  name="categoryId"
                  label="Select a category"
                  data={formattedCategories || []}
                  defaultValue={
                    formattedCategories ? formattedCategories[0].value : ""
                  }
                />{" "}
                <SelectInput
                  name="sizeId"
                  label="Select a size"
                  data={formattedSizes || []}
                  defaultValue={formattedSizes ? formattedSizes[0].value : ""}
                />{" "}
                <SelectInput
                  name="colorId"
                  label="Select a color"
                  data={formattedColors || []}
                  defaultValue={formattedColors ? formattedColors[0].value : ""}
                />{" "}
                <CheckBoxInput
                  name="isFeatured"
                  label="Featured"
                  description="This product will appear in the homepage."
                  disabled={isSubmitting}
                />
                <CheckBoxInput
                  name="isArchived"
                  label="Archived"
                  description="This product will not appear anywhere in the store."
                  disabled={isSubmitting}
                />
                <ImageInput
                  name="images"
                  label="Product images"
                  disabled={isSubmitting}
                  multiChoice={true}
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

export default ProductForm;
