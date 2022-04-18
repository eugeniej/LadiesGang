import React from "react";
import { Button, Flex, Link } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Header } from "../molecules/Header/Header";
import { Title } from "../atoms/Title";

export const Home = () => (
  <Flex
    id="home"
    backgroundImage={[
      "url('/images/hero-mobile.png')",
      "url('/images/hero-ipad.png')",
      "url('/images/hero.png')",
      "url('/images/hero.png')",
    ]}
    backgroundPosition="center"
    backgroundSize={["cover", "cover", "cover", "cover"]}
    backgroundRepeat={false}
    flexDir="column"
    width="100%"
    height={["auto", "auto", "100vh", "100vh"]}
  >
    <Header />
    <Flex
      w={["100%", "100%", "50%", "50%"]}
      h="90vh"
      flexDirection="column"
      justify={["center", "center", "center", "center"]}
      align="center"
    >
      <Flex flexDirection="column" width="100%" justify="center" align="center">
        <Title
          fontSize={["3xl", "4xl", "6xl", "8xl"]}
          fontWeight="bold"
          text="THE OFFICIAL"
        />
        <Title
          fontSize={["3xl", "4xl", "6xl", "8xl"]}
          fontWeight="bold"
          text="GIRLS LAND"
        />
      </Flex>
      <Link
        href="https://discord.com/login?redirect_to=%2Fchannels%2F947691836888203334%2F947691837731266622"
        _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
      >
        <Button
          bgGradient={`linear(to-r, ${Colors.YELLOW},${Colors.PINK},${Colors.BLUE})`}
          fontSize={20}
          rounded="3xl"
          width={["40", "48", "56", "64"]}
          marginTop="10"
          fontFamily="Akshar"
          _hover={{ textDecoration: "none" }}
        >
          Join Discord
        </Button>
      </Link>
    </Flex>
  </Flex>
);
