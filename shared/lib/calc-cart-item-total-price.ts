import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingradientsPrice = item.ingradients.reduce(
    (acc, ingradient) => acc + ingradient.price,
    0
  );
  return (ingradientsPrice + item.productItem.price) * item.quantity;
};
