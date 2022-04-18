import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { Circle } from "../../atoms/Circle";

export const TimelineItem = ({ text }) => {
  return (
    <Flex
      flexDir="column"
      align="center"
      justify="center"
      position="relative"
      p="2rem"
      m="2rem"
      bgColor={Colors.DARK_GRAY}
      rounded="2xl"
      _odd={{ alignSelf: "flex-end" }}
    >
      <Text>{text}</Text>
      <Flex
        position="absolute"
        top="50%"
        right="50%"
        width={"100%"}
        _odd={{ alignSelf: "flex-start" }}
      >
        <Circle />
      </Flex>
    </Flex>
  );
};
