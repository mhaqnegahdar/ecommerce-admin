import { string, object, number, ref, array } from "yup";

const storeSchema = object({
  name: string().required("Required!"),
});

const storeSettingsSchema = object({
  name: string().required("Required!"),
});

export { storeSchema, storeSettingsSchema };
