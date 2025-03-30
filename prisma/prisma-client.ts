import { PrismaClient } from "@prisma/client";

const prismaClientSigleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSigleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSigleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
