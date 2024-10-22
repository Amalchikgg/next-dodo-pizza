import { Ingradient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingradients: CartStateItem["ingradients"]
) => {
  const details = [];
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingradients) {
    details.push(...ingradients.map((ingradient) => ingradient.name));
  }

  return details.join(", ");
};
