import React from "react";

import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal } from "@/shared/components/shared";

import { PageProps } from "@/.next/types/app/(root)/page";

export default async function ProductModalPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
}
