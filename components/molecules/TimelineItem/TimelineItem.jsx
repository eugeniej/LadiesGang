import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { Circle } from "../../atoms/Circle";
import { TextStyled } from "../../atoms/TextStyled";

export const TimelineItem = ({ title, text }) => (
  <Flex
    flexDir="column"
    align="center"
    justify="center"
    position="relative"
    p="2rem"
    m="2rem"
    mr="0"
    bgColor={Colors.DARK_GRAY}
    rounded="2xl"
  >
    <Flex flexDir="column">
      <TextStyled color={Colors.WHITE} fontWeight="extrabold" text={title} />
      <TextStyled
        color={Colors.WHITE}
        fontWeight="light"
        textAlign={"justify"}
        alignItems="baseline"
        pt="1rem"
        text={text}
      />
    </Flex>
    <Flex position="absolute" top="30%" left="-49.5px" width="100%" zIndex="10">
      <Circle />
    </Flex>
  </Flex>
);
