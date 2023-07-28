// Types
import {
  BillboardForm,
  CategoryForm,
  ProductForm,
  SizeForm,
  StoreForm,
  StoreSettingsForm,
} from "@/types/formValues";
import { ProductFormProps } from "@/types/props";
import {
  Category,
  Billboard,
  Store,
  Size,
  Color,
  Product,
  Image,
} from "@prisma/client";

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

const productInit = (
  product: (Product & { images: Image[] }) | null
): ProductForm => {
  return {
    name: product?.name || "",
    images: product?.images || [],
    price: parseFloat(String(product?.price)) || 0,
    categoryId: product?.categoryId || "",
    colorId: product?.colorId || "",
    sizeId: product?.sizeId || "",
    isFeatured: product?.isFeatured || false,
    isArchived: product?.isArchived || false,
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
  productInit,
};
