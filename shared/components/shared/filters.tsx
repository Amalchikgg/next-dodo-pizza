"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilters, useIngradients, useQueryFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingradients, loading } = useIngradients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingradients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={cn("", className)}>
      <Title text='Фильтрация' className='mb-5 font-bold' size='sm' />
      <div className='flex flex-col gap-4'>
        <CheckboxFiltersGroup
          title='Типы теста'
          items={[
            { text: "Тонкое", value: "1" },
            { text: "Традиционное", value: "2" },
          ]}
          onClickCheckbox={filters.setPizzaTypes}
          selected={filters.pizzaTypes}
          name='pizzaTypes'
        />
        <CheckboxFiltersGroup
          title='Размеры'
          className='mb-5'
          items={[
            { text: "20 см", value: "20" },
            { text: "30 см", value: "30" },
            { text: "40 см", value: "40" },
          ]}
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
          name='sizes'
        />
      </div>
      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type='number'
            min={100}
            max={1000}
            placeholder='1000'
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        title='Инградиенты'
        className='mt-5'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngradients}
        selected={filters.selectedIngardients}
        name='ingradients'
      />
    </div>
  );
};
