import React from "react";

import { Params } from "next/dist/server/request/params";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal } from "@/shared/components/shared";

interface ProductModalPageProps {
  params: Params;
}

export default async function ProductModalPage({
  params,
}: ProductModalPageProps) {
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
