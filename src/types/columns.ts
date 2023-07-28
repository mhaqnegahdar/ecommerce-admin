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

type ColorColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

type ProductColumns = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

type OrderColumns = {
  id: string;
  phone: string;
  address: string;
  products: string;
  isPaid: boolean;
  totalPrice: string;
  createdAt: string;
};

export type {
  BillboardColumn,
  CategoryColumns,
  SizeColumns,
  ColorColumns,
  ProductColumns,
  OrderColumns,
};
