import React from "react";
import { Flex, Text, chakra } from "@chakra-ui/react";

export const SoldOut = ({ totalSupply }) => {
  return (
    <Flex direction={"column"} align="center">
      <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
        Public Sale is finished
      </Text>
      <Text fontSize={"1.5rem"}>
        <chakra.span fontWeight={"bold"}>
          NFT sold : <chakra.span color={"purple"}>{totalSupply}</chakra.span>
        </chakra.span>
      </Text>
    </Flex>
  );
};
