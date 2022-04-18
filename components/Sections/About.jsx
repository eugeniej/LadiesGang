import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Title } from "../atoms/Title";
import { TextStyled } from "../atoms/TextStyled";

export const About = () => (
  <Flex
    id="about"
    fontWeight="bold"
    justify="center"
    flexDir={["column-reverse", "column-reverse", "row", "row"]}
    align="center"
    my="md"
    px={["sm", "sm", "lg", "lg"]}
    p={["1rem", "1rem", "1.5rem", "2rem"]}
  >
    <Flex width={["100%", "100%", "50%", "50%"]} p="2rem">
      <TextStyled
        color={Colors.WHITE}
        fontWeight="light"
        marginTop={["0", "0", "28", "28"]}
        textAlign={["justify", "justify", "left", "left"]}
        pl={["0", "0", "2rem", "2rem"]}
        alignItems="baseline"
        text=" Ladies Gang is a group of strong and fulfilled women. We are here to
          stick together and help us find new opportunities as well as new
          perspectives. This group of badass women aims to change things, help
          more women to undertake, help women find a better place important in
          digital and tech. For this we work with an association. Ladies Gang is
          a group of strong and fulfilled women. We are here to stick together
          and help us find new opportunities as well as new perspectives. This
          group of badass women aims to change things, help more women to
          undertake, help women find a better place important in digital and
          tech. For this we work with an association."
      />
    </Flex>
    <Flex
      flexDir={["row", "row", "column", "column"]}
      width={["100%", "100%", "30%", "30%"]}
      marginTop={["0", "0", "-16", "-16"]}
      justify={["center", "center", "normal", "normal"]}
      pt={["2rem", "2rem", "0", "0"]}
    >
      <Title text="OUR" color={Colors.WHITE} />
      <Title text="STORY" color={Colors.PINK} ml={[2, 2, 10, 20]} />
    </Flex>
  </Flex>
);