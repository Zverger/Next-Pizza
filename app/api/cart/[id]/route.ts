import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/business/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await Number(params.id);

    const data = (await req.json()) as { quantity: number };

    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }
    const cartItem = prisma.cartItem.findFirst({
      where: { id },
    });
    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: data.quantity,
      },
    });
    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    const message = "[CART_PATCH] Server error" + error;
    console.log(message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
