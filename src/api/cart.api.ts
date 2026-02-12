import { useMutation, useQuery } from "@tanstack/react-query";
import type { AddToCartPayload, CartItem, DeleteToCartPayload } from "../types/cart.type";
import axiosClient from "./axiosClient";

const addToCart = async (payload: AddToCartPayload): Promise<any> => {
  const response = await axiosClient.post<any>("/carts/add", payload, {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  });
  return response.data;
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};

// ------------------------------------------------------------------

const checkCart = async (token: string): Promise<{ checkCart: boolean }> => {
  const response = await axiosClient.get<{ checkCart: boolean }>(
    "/carts/checkCart",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useCheckCart = (accessToken?: string | null) => {
  return useQuery({
    queryKey: ["checkCart"],
    queryFn: () => checkCart(accessToken!),
    enabled: !!accessToken,
  });
};

// ----------------------------------------------------------------------

const getAllProductsInCart = async (
  accessToken: string | null
): Promise<CartItem[]> => {
  const response = await axiosClient.get<CartItem[]>("/carts/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useGetProductsInCart = (accessToken: string | null) => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: () => getAllProductsInCart(accessToken),
    enabled: !!accessToken,
  });
};

// -------------------------------------------------------------------------

const deleteToCart = async (payload: DeleteToCartPayload): Promise<any> => {
  const response = await axiosClient.delete<any>(`/carts/product/${payload.productId}`, {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
    },
  });
  return response.data;
};

export const useDeleteToCart = () => {
  return useMutation({
    mutationFn: deleteToCart,
  });
};