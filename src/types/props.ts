import {
  Billboard,
  Category,
  Color,
  Image,
  Product,
  Size,
  Store,
} from "@prisma/client";
import { PopoverTrigger } from "@/components/ui/popover";
import {
  BillboardColumn,
  CategoryColumns,
  ColorColumns,
  ProductColumns,
  SizeColumns,
  OrderColumns,
} from "@/types/columns";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// Forms
type SettingsFormProps = {
  store: Store;
};

type BillboardFormProps = {
  billboard: Billboard | null;
};

type CategoryFormProps = {
  category: Category | null;
  billboards: Billboard[] | null;
};

type ProductFormProps = {
  product: (Product & { images: Image[] }) | null;
  sizes: Size[] | null;
  colors: Color[] | null;
  categories: Category[] | null;
};
type SizeFormProps = {
  size: Size | null;
};

type ColorFormProps = {
  color: Color | null;
};

// Pages
type StoreIdProps = {
  params: { storeId: string };
};

type BillboardIdProps = {
  params: { billboardId: string };
};
type ProductIdProps = {
  params: { productId: string; storeId: string };
};

type BillboardPatchParams = {
  params: { storeId: string; billboardId: string };
};

type ProductPatchParams = {
  params: { storeId: string; productId: string };
};
type CategoryIdProps = {
  params: { categoryId: string; storeId: string };
};
type SizeIdProps = {
  params: { sizeId: string; storeId: string };
};
type ColorIdProps = {
  params: { colorId: string; storeId: string };
};

type CategoryPatchParams = {
  params: { storeId: string; categoryId: string };
};

type SizePatchParams = {
  params: { storeId: string; sizeId: string };
};

type ColorPatchParams = {
  params: { storeId: string; colorId: string };
};

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};
// Layouts
type ContainerProps = {
  children: React.ReactNode;
  enableSystem?: boolean;
  defaultTheme?: string;
  attribute?: string;
};

// Components
type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

type DashboardLayoutProps = StoreIdProps & ContainerProps;

type HeadingProps = {
  title: string;
  description: string;
  className?: string;
};

type ApiAlertProps = {
  variant: "admin" | "public";
} & HeadingProps;

type BillboardsClientProps = {
  formattedBillboards: BillboardColumn[];
  store: Store;
};

type OrdersClientProps = {
  formattedOrders: OrderColumns[];
  store: Store;
};

type CategoriesClientProps = {
  formattedCategories: CategoryColumns[];
  store: Store;
};

type SizesClientProps = {
  formattedSizes: SizeColumns[];
  store: Store;
};

type ColorsClientProps = {
  formattedColors: ColorColumns[];
  store: Store;
};

type ProductsClientProps = {
  formattedProducts: ProductColumns[];
  store: Store;
};

type CellActionProps = {
  data:
    | BillboardColumn
    | CategoryColumns
    | SizeColumns
    | ColorColumns
    | ProductColumns;
};
export interface ImageInputProps {
  name: string;
  label: string;
  disabled: boolean;
  multiChoice: boolean;
}

type OverviewProps = {
  data: any[];
};

export type {
  ContainerProps,
  ModalProps,
  DashboardLayoutProps,
  StoreIdProps,
  StoreSwitcherProps,
  SettingsFormProps,
  HeadingProps,
  ApiAlertProps,
  BillboardIdProps,
  BillboardFormProps,
  BillboardPatchParams,
  BillboardsClientProps,
  CellActionProps,
  ApiListProps,
  CategoriesClientProps,
  CategoryIdProps,
  CategoryPatchParams,
  CategoryFormProps,
  SizesClientProps,
  SizeIdProps,
  SizeFormProps,
  SizePatchParams,
  ColorsClientProps,
  ColorIdProps,
  ColorFormProps,
  ColorPatchParams,
  ProductsClientProps,
  ProductIdProps,
  ProductFormProps,
  ProductPatchParams,
  OrdersClientProps,
  OverviewProps,
};
