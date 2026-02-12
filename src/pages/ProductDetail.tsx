import {
    Button,
    HStack,
    Image,
    RatingGroup,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { HiOutlineCursorClick, HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToCart } from "../api/cart.api";
import { useProductDetail } from "../api/product.api";
import { useAuth } from "../contexts/AuthContext";

const sizes = [5, 6, 7, 8];

export default function ProductDetail() {
  const { id } = useParams();
  const { data } = useProductDetail(id as string);
  const { accessToken, refetchCheckCart } = useAuth();
  const navigate = useNavigate();

  const [sizeSelected, setSizeSelected] = useState(sizes[1]);

  const randomRating = useMemo(() => Math.floor(Math.random() * 5) + 1, []);
  const randomViews = useMemo(
    () => Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
    []
  );

  const { mutate } = useAddToCart();

  const addToCartHandle = () => {
    if (!accessToken) {
      return navigate("/login");
    }
    mutate(
      {
        productId: Number(id),
        quantity: 1,
        accessToken,
      },
      {
        onSuccess: () => {
          toast.success("Add product to cart successfully");
          refetchCheckCart();
        },
      }
    );
  };
  return (
    <VStack spaceY={2} width={"100%"}>
      <Image
        borderRadius={10}
        width={"100%"}
        height={190}
        objectPosition={"center"}
        src={data?.image}
        alt="naruto"
        objectFit="cover"
      />
      <VStack width={"100%"} alignItems={"start"}>
        <Text fontWeight={"medium"}>Size {sizeSelected}UK</Text>
        <HStack spaceX={1}>
          {sizes.map((item, key) => (
            <Tag.Root
              onClick={() => setSizeSelected(item)}
              cursor={"pointer"}
              colorPalette={"red"}
              borderColor={"red"}
              bg={item == sizeSelected ? "#FA7189" : "white"}
              color={item != sizeSelected ? "#FA7189" : "white"}
              key={key}
              size={"xl"}
            >
              <Tag.Label>{item} UK</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </VStack>
      <VStack spaceY={-1} width={"100%"} alignItems={"start"}>
        <Text textStyle={"lg"} fontWeight={600}>
          {data?.name}
        </Text>
        <Text color={"gray.600"} textAlign={"justify"}>
          {data?.description}
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
        <HStack spaceX={2}>
          <Text textDecoration="line-through" color={"gray.400"}>
            {Number(data?.price || 0) * 2}
          </Text>
          <Text fontWeight={"medium"}>₹{Number(data?.price || 0)}</Text>
          <Text color={"red.400"}>50% Off</Text>
        </HStack>
      </VStack>
      <VStack width={"100%"} alignItems={"start"}>
        <Text textStyle={"lg"} fontWeight={600}>
          Product detail
        </Text>
        <Text color={"gray.600"} textAlign={"justify"}>
          {data?.detail} ...More
        </Text>
      </VStack>
      <HStack width={"100%"} alignItems={"start"}>
        <Button onClick={addToCartHandle} width={"50%"} bgColor={"#3F92FF"}>
          <HiOutlineShoppingCart />
          Go to cart
        </Button>

        <Button width={"50%"} bgColor={"#31B769"}>
          <HiOutlineCursorClick />
          Buy Now
        </Button>
      </HStack>
    </VStack>
  );
}
