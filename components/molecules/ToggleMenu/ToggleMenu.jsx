import React from "react";
import { Flex, IconButton, Button } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export const ToggleMenu = ({ display, setDisplay }) => (
  <Flex
    w="100vw"
    bgColor={Colors.DARK}
    zIndex={20}
    h="100vh"
    pos="fixed"
    top="0"
    left="0"
    overflowY="auto"
    flexDir="column"
    display={display}
  >
    <Flex justify="flex-end">
      <IconButton
        mt="2"
        mr="2"
        aria-label="Close Menu"
        size="lg"
        icon={<CloseIcon />}
        backgroundColor="transparent"
        onClick={() => setDisplay("none")}
      />
    </Flex>
    <Flex align="center" flexDir="column">
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          w="100%"
          fontFamily="Akshar"
          fontSize="20px"
        >
          ABOUT
        </Button>
      </NextLink>
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          w="100%"
          fontFamily="Akshar"
          fontSize="20px"
        >
          ROADMAP
        </Button>
      </NextLink>
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          w="100%"
          fontFamily="Akshar"
          fontSize="20px"
        >
          COLLECTION
        </Button>
      </NextLink>
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          w="100%"
          fontFamily="Akshar"
          fontSize="20px"
        >
          THE TEAM
        </Button>
      </NextLink>
      <NextLink href="/" passHref>
        <Button
          as="a"
          variant="ghost"
          w="100%"
          fontFamily="Akshar"
          fontSize="20px"
        >
          MINT
        </Button>
      </NextLink>
    </Flex>
  </Flex>
);
