import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingradients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngardients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (key: string) => void;
  setSizes: (key: string) => void;
  setSelectedIngradients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const router = useRouter();

  const [selectedIngardients, { toggle: toggleIngradients }] = useSet(
    new Set<string>(searchParams.get("ingradients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngardients,
      prices,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngradients: toggleIngradients,
    }),
    [
      pizzaTypes,
      prices,
      selectedIngardients,
      sizes,
      toggleIngradients,
      togglePizzaTypes,
      toggleSizes,
    ]
  );
};
