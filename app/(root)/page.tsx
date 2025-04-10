import {
  TopBar,
  Title,
  Container,
  Filters,
  ProductGroupList,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((cat) => cat.products.length)} />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[100px]">
          {/*Фильтрация*/}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          {/*Список товаров*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (cat) =>
                  cat.products.length && (
                    <ProductGroupList
                      key={cat.id}
                      title={cat.name}
                      categoryId={cat.id}
                      items={cat.products}
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
