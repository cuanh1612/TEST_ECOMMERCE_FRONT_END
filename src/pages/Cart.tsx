import { Text, VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useDeleteToCart, useGetProductsInCart } from "../api/cart.api";
import CardItem from "../components/CardItem";
import { useAuth } from "../contexts/AuthContext";

export default function Cart() {
  const { accessToken, refetchCheckCart } = useAuth();
  const { data, refetch } = useGetProductsInCart(accessToken);
  const { mutate } = useDeleteToCart();

  const handleDelete = (productId: number) => {
    mutate(
      {
        accessToken,
        productId,
      },
      {
        onSuccess: () => {
          toast.success("Product removed from cart");
          refetch();
          refetchCheckCart()
        },
      }
    );
  };
  return (
    <VStack spaceY={3} width={"100%"}>
      <Text width={"100%"} fontWeight={"medium"}>
        Shopping List
      </Text>
      <VStack spaceY={2} width={"100%"}>
        {(!data || data.length == 0) && (
          <Text textStyle={'xl'} fontWeight={700} color={'gray.500'} textAlign={'center'}>Your cart is empty. Start shopping now!"</Text>
        )}
        {data?.map((item) => (
          <CardItem
            onDelete={(productId: number) => handleDelete(productId)}
            key={item.id}
            data={item}
          />
        ))}
      </VStack>
    </VStack>
  );
}
