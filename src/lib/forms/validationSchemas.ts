import { string, object, number, ref, array } from "yup";

export const storeSchema = object({
  name: string().required("Required!"),
});
