"use client";
import { Dialog } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const { back } = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={back}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] max-h-[90vh] bg-white overflow-auto scrollbar",
          className
        )}
      >
        <ProductForm product={product} onSubmit={back} />
      </DialogContent>
    </Dialog>
  );
};
