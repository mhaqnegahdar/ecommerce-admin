import { Store } from "@prisma/client";

type StoreForm = {
  name: string;
};

type StoreSettingsForm = {
  name: string;
};

type BillboardForm = {
  label: string;
  imageUrl: string;
};

type CategoryForm = {
  name: string;
  billboardId: string;
};

type SizeForm = {
  name: string;
  value: string;
};

type OnSubmitParams = {
  setSubmitting: (value: boolean) => void;
  isSubmitting?: boolean;
  resetForm: () => void;
};

// Export
export type {
  OnSubmitParams,
  StoreForm,
  StoreSettingsForm,
  BillboardForm,
  CategoryForm,
  SizeForm,
};
