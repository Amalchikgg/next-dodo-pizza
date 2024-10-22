import { Ingradient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingradients: Ingradient[];
};
