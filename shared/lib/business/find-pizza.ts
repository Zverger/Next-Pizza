import { prisma } from "@/prisma/prisma-client";
import { MAX_PRICE, MIN_PRICE } from "@/shared/constants";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

export const findPizza = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsArr = params.ingredients?.split(",").map(Number);
  const minPrice = Number(params.priceFrom) || MIN_PRICE;
  const maxPrice = Number(params.priceTo) || MAX_PRICE;
  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientsArr
            ? {
                some: {
                  id: {
                    in: ingredientsArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });
  return categories;
};
