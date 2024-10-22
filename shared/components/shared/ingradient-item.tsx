import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}

export const IngradientItem: React.FC<Props> = ({
  className,
  onClick,
  imageUrl,
  name,
  price,
  active,
}) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
        { "border-primary border": active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className='absolute top-2 right-2 text-primary' />
      )}
      <img width={110} height={110} src={imageUrl} alt={name} />
      <span className='text-sx mb-1'>{name}</span>
      <span className='font-bold'>{price} ₽</span>
    </div>
  );
};
