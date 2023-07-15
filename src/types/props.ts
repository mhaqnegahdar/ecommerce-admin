type ChildrenProps = {
  children: React.ReactNode;
};

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export type { ChildrenProps, ModalProps };
