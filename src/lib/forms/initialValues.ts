// Types
import { StoreForm, StoreSettingsForm } from "@/types/formValues";
import { Store } from "@prisma/client";

const storeInit = {
  name: "",
} as StoreForm;

const storeSettingsInit = (store: Store): StoreSettingsForm => {
  return {
    name: store.name,
  };
};

export { storeInit, storeSettingsInit };
