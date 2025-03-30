import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  return NextResponse.json(await prisma.ingredient.findMany());
}
