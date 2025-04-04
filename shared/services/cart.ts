import { Cart } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { CartDTO } from "./dto/cart.dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;
};

export const updateCartQuantity = async (
  id: number,
  quantity: number
): Promise<CartDTO> => {
  return (
    await axiosInstance.patch<CartDTO>(ApiRoutes.CART + `/${id}`, { quantity })
  ).data;
};
