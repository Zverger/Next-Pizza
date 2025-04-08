import { prisma } from "@/prisma/prisma-client";
import { findOrCreateUserCart } from "@/shared/lib";
import { updateCartTotalAmount } from "@/shared/lib/business/update-cart-total-amount";
import { CreateCartItemValues } from "@/shared/services/dto";
import { NextRequest, NextResponse } from "next/server";
import { off } from "process";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: { product: true },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    //заменить на хранение корзины в local storage
    const token = req.cookies.get("cartToken")?.value ?? crypto.randomUUID();

    const userCart = await findOrCreateUserCart(token);

    const data = (await req.json()) as CreateCartItemValues;
    //если товар найден то +1 к  quantity
    const findCartitem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    if (findCartitem) {
      await prisma.cartItem.update({
        where: { id: findCartitem.cartId },
        data: { quantity: findCartitem.quantity + 1 },
      });

      const updatedUserCart = await updateCartTotalAmount(token);
      const resp = NextResponse.json(updatedUserCart);
      resp.cookies.set("cartToken", token);
      return resp;
    }
    //если товар не найден
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
      },
    });
  } catch (e) {
    console.error(e, "[CART_POST] server error");
    return NextResponse.json(
      { message: "не удалось создать корзину" },
      { status: 500 }
    );
  }
}
