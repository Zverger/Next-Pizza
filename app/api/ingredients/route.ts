import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  return NextResponse.json(await prisma.ingredient.findMany());
}
