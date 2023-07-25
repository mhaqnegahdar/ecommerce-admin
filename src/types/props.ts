import { Billboard, Category, Store } from "@prisma/client";
import { PopoverTrigger } from "@/components/ui/popover";
import { BillboardColumn, CategoryColumns } from "@/types/columns";

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

// Pages
type StoreIdProps = {
  params: { storeId: string };
};

type BillboardIdProps = {
  params: { billboardId: string };
};

type BillboardPatchParams = {
  params: { storeId: string; billboardId: string };
};
type CategoryIdProps = {
  params: { categoryId: string; storeId: string };
};

type CategoryPatchParams = {
  params: { storeId: string; categoryId: string };
};

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};
// Layouts
type ContainerProps = {
  children: React.ReactNode;
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

type CategoriesClientProps = {
  formattedCategories: CategoryColumns[];
  store: Store;
};
type CellActionProps = {
  data: BillboardColumn | CategoryColumns;
};
export interface ImageInputProps {
  name: string;
  label: string;
  disabled: boolean;
}

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
};
