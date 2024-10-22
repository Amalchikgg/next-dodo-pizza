/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { ProductCards } from "./product-cards";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  className?: string;
  title: string;
  items: ProductWithRelations[];
  listClassName?: string;
  categoryId: number;
}

export const ProductsGropList: React.FC<Props> = ({
  className,
  title,
  items,
  categoryId,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId]);

  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCards
            key={product.id}
            id={product.id}
            price={product.items[0].price}
            name={product.name}
            imageUrl={product.imageUrl}
            ingradients={product.ingradients}
          />
        ))}
      </div>
    </div>
  );
};
