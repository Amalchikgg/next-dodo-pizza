import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingradient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType, mapPizzaType } from "../constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingradients: Ingradient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingradients,
    selectedIngredients
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetails };
};
