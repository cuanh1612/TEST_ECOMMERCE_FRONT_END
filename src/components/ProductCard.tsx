import { Box, HStack, Image, RatingGroup, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product.type";

export default function ProductCard({
  id,
  image,
  price,
  name,
  description,
}: Product) {
  const randomRating = useMemo(() => Math.floor(Math.random() * 5) + 1, []);
  const randomViews = useMemo(
    () => Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
    []
  );
  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="0.2s"
      cursor={"pointer"}
    >
      <Link to={`./${id}`}>
        <Image src={image} alt={name} w="100%" objectFit="cover" />

        <Box overflow={"hidden"} px={3} py={1}>
          <Text
            maxW={110}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace={"nowrap"}
            fontWeight="medium"
          >
            {name}
          </Text>
          <Text
            color={"gray.600"}
            textStyle={"sm"}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Text>

          <Text mt={2} fontWeight="medium" textStyle={"md"}>
            ₹{Number(price)}
          </Text>

          <HStack mt={2}>
            <RatingGroup.Root
              readOnly
              colorPalette={"yellow"}
              count={randomRating}
              defaultValue={randomRating}
              size="xs"
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
            <Text color={"gray.400"}>{randomViews}</Text>
          </HStack>
        </Box>
      </Link>
    </Box>
  );
}
