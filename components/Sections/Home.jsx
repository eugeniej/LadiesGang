import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Header } from "../molecules/Header/Header";

export const Home = () => {
  return (
    <Flex
      id="home"
      backgroundImage="url('/images/hero.png')"
      backgroundPosition="center"
      backgroundSize={["auto", "auto", "cover", "cover"]}
      flexDir="column"
      width="100%"
      height="100vh"
    >
      <Header />
      <Flex
        w={["100%", "100%", "50%", "50%"]}
        h="90vh"
        flexDirection="column"
        justify="center"
        align="center"
      >
        <Flex
          flexDirection="column"
          width="100%"
          justify="center"
          align="center"
        >
          <Text fontSize={["2xl", "3xl", "6xl", "6xl"]} fontWeight="bold">
            THE OFFICIAL
          </Text>
          <Text fontSize={["2xl", "3xl", "6xl", "6xl"]} fontWeight="bold">
            GIRLS LAND
          </Text>
        </Flex>
        <Button
          bgGradient={`linear(to-r, ${Colors.YELLOW},${Colors.PINK},${Colors.BLUE})`}
          onClick={() => {}}
          fontSize={15}
          rounded="3xl"
          maxWidth="44"
          marginTop="10"
        >
          JOIN DISCORD
        </Button>
      </Flex>
    </Flex>
  );
};
