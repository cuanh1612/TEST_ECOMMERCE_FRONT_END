import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";
import type { Product } from "../types/product.type";

export interface ProductsResponse {
  data: Product[];
}

const getAllProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

// ------------------------------------------------------------

const getProductDetail = async (id: string): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};