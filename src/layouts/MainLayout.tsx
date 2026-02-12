import { HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <HStack
      bg="white"
      alignItems="start"
      mx="auto"
      minH="100vh"
      maxW={375}
      px={8}
      pb={16}
      flexDir="column"
      gap={4}
    >
      <Navbar />
      <Outlet />
    </HStack>
  );
}

export default MainLayout;
