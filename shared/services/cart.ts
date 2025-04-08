import { ApiRoutes } from "./constants";
import { CartDTO, CartItemDTO } from "./dto/cart.dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> =>
  (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;

export const updateCartQuantity = async (
  id: number,
  quantity: number
): Promise<CartDTO> =>
  (await axiosInstance.patch<CartDTO>(ApiRoutes.CART + `/${id}`, { quantity }))
    .data;

export const removeCartItem = async (id: number) =>
  (await axiosInstance.delete<CartDTO>(ApiRoutes.CART + `/${id}`)).data;

export const addCartItem = async (
  productItemId: number,
  ingredients?: number[]
) =>
  (
    await axiosInstance.post<CartDTO>(
      ApiRoutes.CART,
      ingredients
        ? {
            productItemId,
            ingredients,
          }
        : { productItemId }
    )
  ).data;
