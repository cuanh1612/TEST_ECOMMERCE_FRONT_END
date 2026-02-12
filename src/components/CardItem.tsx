import { HStack, IconButton, Image, Tag, Text, VStack } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import type { CartItem } from "../types/cart.type";

export default function CardItem({
  data,
  onDelete,
}: {
  data: CartItem;
  onDelete: (productId: number) => void;
}) {
  return (
    <VStack
      pos={"relative"}
      px={2}
      py={2}
      shadow={"md"}
      borderRadius={10}
      width={"100%"}
    >
      <HStack spaceX={1} width={"100%"}>
        <Image
          minW={120}
          w={120}
          height={120}
          objectFit={"cover"}
          objectPosition={"center"}
          src={data.product.image}
        />
        <VStack alignItems={"start"} width={"100%"}>
          <Text fontWeight={"medium"}>{data.product.name}</Text>
          <HStack>
            <Text textStyle={"sm"}>Variations:</Text>
            <HStack>
              <Tag.Root cursor={"pointer"} size={"md"}>
                <Tag.Label>Black</Tag.Label>
              </Tag.Root>
              <Tag.Root cursor={"pointer"} size={"md"}>
                <Tag.Label>Red</Tag.Label>
              </Tag.Root>
            </HStack>
          </HStack>
          <HStack>
            <Text
              fontWeight={"medium"}
              border={"1px solid"}
              px={1}
              py={1}
              borderColor={"gray.200"}
            >
              ${Number(data.product.price)}
            </Text>
            <VStack spaceY={-2}>
              <Text color={"red.400"} textStyle={"xs"}>
                Up to 50% off
              </Text>
              <Text
                fontSize={"sm"}
                textDecoration="line-through"
                color={"gray.400"}
              >
                ${Number(data.product.price) * 2}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <HStack
        borderTop={"1px solid"}
        borderColor={"gray.300"}
        width={"100%"}
        justifyContent={"space-between"}
        pt={1}
      >
        <Text textStyle={"sm"}>Total Order ({data.quantity}):</Text>
        <Text fontWeight={"medium"}>
          ${Number(data.product.price) * data.quantity}
        </Text>
      </HStack>
      <IconButton
        size={"xs"}
        position={"absolute"}
        top={0}
        right={0}
        onClick={() => onDelete(data.product.id)}
        bg={"red.400"}
      >
        <FiTrash />
      </IconButton>
    </VStack>
  );
}
