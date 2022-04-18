import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";

export const ItemCard = ({ image, title, description }) => {
  return (
    <Flex
      justify="center"
      bgColor={Colors.LIGHT_GRAY}
      flexDir="column"
      align="center"
      p="2rem"
      rounded="2xl"
      margin="5"
      minWidth={["40", "40", "72", "72"]}
      maxWidth={["72", "72", "72", "72"]}
    >
      <Image src={image} alt="" width="100%" height="100%" rounded="2xl" />
      <Flex
        flexDir="column"
        justify="center"
        align="center"
        px="1rem"
        pt="2rem"
      >
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize="2xl"
          color={Colors.WHITE}
        >
          {title}
        </Text>
        <Text textAlign="center" fontWeight="light" color={Colors.WHITE}>
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};
