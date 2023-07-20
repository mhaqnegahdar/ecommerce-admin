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

export { storeSchema, storeSettingsSchema, billboardSchema };
