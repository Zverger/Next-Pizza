import { CartDTO } from "./dto/cart.dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>("/cart")).data;
};
