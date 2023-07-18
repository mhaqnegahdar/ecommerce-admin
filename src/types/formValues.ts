import { Store } from "@prisma/client";

type StoreForm = {
  name: string;
};

type StoreSettingsForm = {
  name: string;
};

type OnSubmitParams = {
  setSubmitting: (value: boolean) => void;
  isSubmitting?: boolean;
  resetForm: () => void;
};

// Export
export type { OnSubmitParams, StoreForm, StoreSettingsForm };
