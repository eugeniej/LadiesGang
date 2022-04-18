import React from "react";
import { Flex } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { ItemCard } from "../molecules/ItemCard/ItemCard";
import { Title } from "../atoms/Title";

export const Team = () => {
  return (
    <Flex
      id="team"
      fontWeight="bold"
      justify="center"
      flexDir="column"
      align="center"
      my="md"
      px={["sm", "sm", "lg", "lg"]}
      p="2rem"
      mt="4rem"
      bgGradient={`linear(${Colors.DARK},${Colors.PURPLE},${Colors.PURPLE})`}
    >
      <Title
        text="TEAM"
        color={Colors.WHITE}
        textAlign="center"
        mt={["0", "0", "2rem", "2rem"]}
      />
      <Flex
        justify="center"
        flexDir={["column", "column", "row", "row"]}
        align="center"
      >
        <ItemCard
          image={"/persona3.png"}
          title="GENIE JO"
          description="Web developer & Artist"
        />
        <ItemCard
          image={"/persona1.png"}
          title="LOLIPOP"
          description="Marketing specialist"
        />
        <ItemCard
          image={"/persona2.png"}
          title="ALEXA"
          description="Project Lead"
        />
      </Flex>
    </Flex>
  );
};
