import {
  Container,
  Filters,
  ProductCards,
  Stories,
  Title,
  TopBar,
} from "@/shared/components/shared";
import { ProductsGropList } from "@/shared/components/shared/products-grop-list";
import { Button } from "@/shared/components/ui/button";
import { prisma } from "@/prisma/prisma-client";
import Image from "next/image";
import { Suspense } from "react";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' className='font-extrabold' size='lg' />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Stories />
      <Container className='pb-14 mt-10'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGropList
                      key={category.id}
                      items={category.products}
                      title={category.name}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
