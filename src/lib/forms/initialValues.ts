// Types
import {
  BillboardForm,
  CategoryForm,
  SizeForm,
  StoreForm,
  StoreSettingsForm,
} from "@/types/formValues";
import { Category, Billboard, Store, Size, Color } from "@prisma/client";

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
    imageUrl: billboard?.imageUrl || "",
  };
};

const categoryInit = (category: Category | null): CategoryForm => {
  return {
    name: category?.name || "",
    billboardId: category?.billboardId || "",
  };
};

const sizeInit = (size: Size | null): SizeForm => {
  return {
    name: size?.name || "",
    value: size?.value || "",
  };
};

const colorInit = (color: Color | null): SizeForm => {
  return {
    name: color?.name || "",
    value: color?.value || "#111",
  };
};

export {
  storeInit,
  storeSettingsInit,
  billboardInit,
  categoryInit,
  sizeInit,
  colorInit,
};
