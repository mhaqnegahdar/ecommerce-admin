interface ModalState {
  isOpen: boolean;
}

interface AlertModalState {
  isOpen: boolean;
  title: string;
  description: string;
  action: string;
}

type AlertModalPayload = Omit<AlertModalState, "isOpen">;

export type { ModalState, AlertModalState, AlertModalPayload };
