import { string, object, number, ref, array, boolean } from "yup";

const storeSchema = object({
  name: string().required("Required!"),
});

const storeSettingsSchema = object({
  name: string().required("Required!"),
});

const billboardSchema = object({
  label: string().required("Required!"),
  imageUrl: string().required("Required!"),
});

const categorySchema = object({
  name: string().required("Required!"),
  billboardId: string().required("Required!"),
});

const sizeSchema = object({
  name: string().required("Required!"),
  value: string().required("Required!"),
});

const colorSchema = object({
  name: string().required("Required!"),
  value: string().required("Required!"),
});

const productSchema = object({
  name: string().required("Required!"),
  images: array().of(
    object().shape({
      url: string().url("Invalid Image URL").required("Required!"),
    })
  ),
  price: number().positive("Price can't be less than 0").required("Required!"),
  categoryId: string().required("Required!"),
  colorId: string().required("Required!"),
  sizeId: string().required("Required!"),
  isFeatured: boolean().required("Required!"),
  isArchived: boolean().required("Required!"),
});

export {
  storeSchema,
  storeSettingsSchema,
  billboardSchema,
  categorySchema,
  sizeSchema,
  colorSchema,
  productSchema,
};
