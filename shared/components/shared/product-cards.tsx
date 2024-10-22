import { cn } from "@/shared/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingradient } from "@prisma/client";

interface Props {
  className?: string;
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  ingradients: Ingradient[];
}

export const ProductCards: React.FC<Props> = ({
  className,
  id,
  price,
  imageUrl,
  name,
  ingradients,
}) => {
  return (
    <div className={cn("", className)}>
      <Link
        href={`/product/${id}`}
        className='h-[450px] flex flex-col justify-between'
      >
        <div>
          <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
            <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
          </div>

          <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
          <p className='text-sm text-gray-400'>
            {ingradients.map((item) => item.name).join(", ")}
          </p>
        </div>
        <div>
          <div className='flex justify-between items-center mt-4'>
            <span className='text-[20px]'>
              от <b>{price} ₽</b>
            </span>

            <Button variant='secondary'>
              <Plus size={20} className='mr-1' />
              Добавить
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
