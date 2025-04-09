import { prisma } from "@/prisma/prisma-client";
import { arrayIncludesAll, findOrCreateUserCart } from "@/shared/lib";
import { updateCartTotalAmount } from "@/shared/lib/business/update-cart-total-amount";
import { CreateCartItemValues } from "@/shared/services/dto";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error: any) {
    console.log("[CART_GET] Server error");
    console.error(error.message);

    return NextResponse.json(
      { message: "Не удалось найти корзину" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateUserCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = (
      await prisma.cartItem.findMany({
        where: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            every: {
              id: { in: data.ingredients },
            },
          },
        },
        include: {
          ingredients: true,
        },
      })
    )?.find((item) =>
      arrayIncludesAll(
        item.ingredients.map((ing) => ing.id),
        data.ingredients
      )
    );

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);
    return resp;
  } catch (error: any) {
    console.log("[CART_POST] Server error");
    console.error(error.message);

    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 }
    );
  }
}
