type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

type CategoryColumns = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

type SizeColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export type { BillboardColumn, CategoryColumns, SizeColumns };
