import { string, object, number, ref, array } from "yup";

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

export {
  storeSchema,
  storeSettingsSchema,
  billboardSchema,
  categorySchema,
  sizeSchema,
  colorSchema,
};
