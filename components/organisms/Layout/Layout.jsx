import React from "react";
import { Flex } from "@chakra-ui/react";
import { Footer } from "../../molecules/Footer/Footer";
import { Colors } from "../../../utils/colors";

export const Layout = ({ logo, ...props }) => (
  <Flex
    w="100%"
    h="100%"
    minH="100vh"
    bgColor={Colors.DARK}
    color={Colors.WHITE}
    fontFamily={"Arial, sans-serif"}
    flexDir="column"
    alignItems="stretch"
    {...props}
  >
    <Flex
      align={"center"}
      justify="center"
      flexDir={"column"}
      w="100%"
      flex={1}
    >
      {props.children}
    </Flex>
    <Footer logo={logo} />
  </Flex>
);
