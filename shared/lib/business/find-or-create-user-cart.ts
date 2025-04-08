import { prisma } from "@/prisma/prisma-client";

export const findOrCreateUserCart = async (token: string) =>
  (await prisma.cart.findFirst({ where: { token } })) ||
  (await prisma.cart.create({ data: { token } }));
