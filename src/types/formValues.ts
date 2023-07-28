import { Image, Store } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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

type ColorForm = {
  name: string;
  value: string;
};

type ProductForm = {
  name: string;
  images: Image[];
  price: number | Decimal;
  categoryId: string;
  colorId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
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
  ColorForm,
  ProductForm,
};
