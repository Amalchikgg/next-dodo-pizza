import { Ingradient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingradients: Ingradient[],
  selectedIngradients: Set<number> = new Set<number>()
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType == type && item.size == size)?.price ||
    0;
  const totalIngradientsPrice = ingradients
    .filter((item) => selectedIngradients.has(item.id))
    .reduce((acc, ingradient) => acc + ingradient.price, 0);

  return pizzaPrice + totalIngradientsPrice;
};
