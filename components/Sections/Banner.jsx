import { Flex } from "@chakra-ui/react";
import React from "react";

export const Banner = () => {
  return (
    <Flex
      backgroundImage="url('/images/static-banner.png')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      width="100%"
      height="600px"
    ></Flex>
  );
};
