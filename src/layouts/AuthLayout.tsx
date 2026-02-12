import { HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <HStack
      bg="white"
      alignItems="start"
      mx="auto"
      minH="100vh"
      maxW={375}
      px={8}
      py={16}
      flexDir="column"
      gap={6}
    >
      <Outlet />
    </HStack>
  );
}

export default AuthLayout;
