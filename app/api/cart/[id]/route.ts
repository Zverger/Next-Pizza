import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/business/update-cart-total-amount";
import { error } from "console";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    const data = (await req.json()) as { quantity: number };

    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }
    const cartItem = prisma.cartItem.findFirst({
      where: { id: Number(id) },
    });
    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.update({
      where: { id: Number(id) },
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    const token = req.cookies.get("cartToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }
    console.log(2);
    const deletedCartItem = await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(1);
    if (!deletedCartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    const upadetedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(upadetedUserCart);
  } catch {
    const message = "[CART_DELETE] Server error" + error;
    console.log(message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
