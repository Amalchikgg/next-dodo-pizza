import React, { useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngradients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngradient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngradients, { toggle: addIngradient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;
  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) == size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSizes) {
      setSize(Number(availableSize?.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngradients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngradient,
  };
};
