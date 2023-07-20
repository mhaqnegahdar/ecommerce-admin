// Types
import {
  BillboardForm,
  StoreForm,
  StoreSettingsForm,
} from "@/types/formValues";
import { Billboard, Store } from "@prisma/client";

const storeInit = {
  name: "",
} as StoreForm;

const storeSettingsInit = (store: Store): StoreSettingsForm => {
  return {
    name: store.name,
  };
};

const billboardInit = (billboard: Billboard | null): BillboardForm => {
  return {
    label: billboard?.label || "",
    imageUrl: billboard?.label || "",
  };
};

export { storeInit, storeSettingsInit, billboardInit };
