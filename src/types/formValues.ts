type StoreForm = {
  name: string;
};

type OnSubmitParams = {
  setSubmitting: (value: boolean) => void;
  isSubmitting?: boolean;
  resetForm: () => void;
};

// Export
export type { StoreForm, OnSubmitParams };
