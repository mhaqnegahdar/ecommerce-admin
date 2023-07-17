import { Store } from "@prisma/client";
import { PopoverTrigger } from "@/components/ui/popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

type ContainerProps = {
  children: React.ReactNode;
};

type StoreIdProps = {
  params: { storeId: string };
};

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

type DashboardLayoutProps = StoreIdProps & ContainerProps;

export type {
  ContainerProps,
  ModalProps,
  DashboardLayoutProps,
  StoreIdProps,
  StoreSwitcherProps,
};
