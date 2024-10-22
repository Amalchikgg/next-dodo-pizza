"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import GroupVariants from "./group-variants";
import { PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingradient, ProductItem } from "@prisma/client";
import { IngradientItem } from "./ingradient-item";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingradient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  ingredients,
  items,
  loading,
  onSubmit,
  name,
}) => {
  const {
    size,
    type,
    selectedIngradients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngradient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngradients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngradients));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-grau-400 mb-3'>{textDetails}</p>
        <div className='flex flex-col gap-5'>
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as 20 | 30 | 40)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients?.map((ingradient) => (
              <IngradientItem
                key={ingradient.id}
                imageUrl={ingradient.imageUrl}
                price={ingradient.price}
                name={ingradient.name}
                onClick={() => addIngradient(ingradient.id)}
                active={selectedIngradients.has(ingradient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
