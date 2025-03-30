import React from "react";

import { Params } from "next/dist/server/request/params";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, Title } from "@/shared/components/shared";
import { PizzaImage } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";

interface ProductPageProps {
  params: Params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {},
  });
  if (!product) return notFound();

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage size={30} imageUrl={product.imageUrl} />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
            recusandae laborum minus quod delectus ab quo nemo, quae quaerat
            voluptates, aspernatur corrupti tempore culpa qui optio nesciunt
            autem id? Id!
          </p>
          <GroupVariants
            items={[
              { name: "Маленькая", value: "1" },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3" },
            ]}
            selectedValue="2"
          />
        </div>
      </div>
    </Container>
  );
}
