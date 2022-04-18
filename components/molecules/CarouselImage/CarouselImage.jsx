import React from "react";
import { Flex, Image } from "@chakra-ui/react";

export const CarouselImage = ({ image }) => {
  return (
    <Flex
      position="relative"
      justify="center"
      align="center"
      p="2rem"
      px="3rem"
    >
      <Image src={image} alt="" height="100%" width="100%" />
    </Flex>
  );
};
