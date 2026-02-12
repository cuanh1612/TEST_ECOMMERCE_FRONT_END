import {
    Avatar,
    Box,
    HStack,
    Image,
    Menu,
    Portal,
    Stack,
} from "@chakra-ui/react";
import { FiChevronLeft, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { accessToken, logout, checkCart } = useAuth();
  const navigate = useNavigate();
  const isProductDetail = location.pathname !== "/products";

  return (
    <HStack w="100%" justify="space-between" py={4}>
      {!isProductDetail ? (
        <FiMenu />
      ) : (
        <FiChevronLeft
          size={22}
          cursor="pointer"
          onClick={() => navigate(-1)}
        />
      )}
      <Image src={logo} />

      <Box overflow={"hidden"} position={"relative"}>
        {!accessToken ? (
          <Link to={"/login"}>
            <Avatar.Root cursor="pointer">
              <Avatar.Fallback />
            </Avatar.Root>
          </Link>
        ) : (
          <Stack gap="4" align="flex-start">
            <Menu.Root positioning={{ placement: "bottom-end" }}>
              <Menu.Trigger asChild>
                <Box>
                  <Avatar.Root cursor="pointer">
                    <Avatar.Image />
                    <Avatar.Fallback>{accessToken[0]}</Avatar.Fallback>
                  </Avatar.Root>
                </Box>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      onClick={() => navigate("/cart")}
                      cursor={"pointer"}
                      value="cart"
                    >
                      {checkCart && (
                        <Box
                          borderRadius={10}
                          width={2.5}
                          bg={"red.500"}
                          height={2.5}
                        />
                      )}
                      Cart{" "}
                    </Menu.Item>
                    <Menu.Item
                      onClick={logout}
                      cursor={"pointer"}
                      value="logout"
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            {checkCart && (
              <Box
                position={"absolute"}
                borderRadius={10}
                right={0.5}
                width={2.5}
                bg={"red.500"}
                height={2.5}
              />
            )}
          </Stack>
        )}
      </Box>
    </HStack>
  );
}

export default Navbar;
