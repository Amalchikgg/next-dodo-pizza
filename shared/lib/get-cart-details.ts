import { Cart } from "@prisma/client";
import { CartDTO } from "../services/dto/cart.dto";
import { ingradients } from "@/prisma/constants";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingradients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    disabled: false,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingradients: item.ingradients.map((ingradient) => ({
      name: ingradient.name,
      price: ingradient.price,
    })),
  })) as CartStateItem[];
  return {
    totalAmount: data.totalAmount,
    items: items,
  };
};
