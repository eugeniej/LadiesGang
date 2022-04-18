import React from "react";
import { Flex, Image, WrapItem, Center, keyframes } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { TextStyled } from "../../atoms/TextStyled";

export const ItemCard = ({ image, title, description }) => {
  return (
    <WrapItem
      transitionProperty="shadow"
      transitionDuration="1"
      transitionTimingFunction="ease-in-out"
      _hover={{ boxShadow: "0 0 18px #00D8FA" }}
      bgColor={Colors.LIGHT_GRAY}
      flexDir="column"
      justify="center"
      align="center"
      p={["1.5rem", "1.5rem", "1.5rem", "2rem"]}
      rounded="2xl"
      minWidth={["40", "40", "60", "60"]}
      maxWidth={["56", "56", "60", "72"]}
    >
      <Center flexDir={"column"}>
        <Image src={image} alt="" width="100%" height="100%" rounded="2xl" />
        <Flex
          direction="column"
          justify="center"
          align="center"
          px="1rem"
          pt="2rem"
        >
          <TextStyled
            textAlign="center"
            fontWeight="bold"
            fontSize="2xl"
            color={Colors.WHITE}
            text={title}
          />
          <TextStyled
            textAlign="center"
            fontWeight="light"
            color={Colors.WHITE}
            text={description}
          />
        </Flex>
      </Center>
    </WrapItem>
  );
};
