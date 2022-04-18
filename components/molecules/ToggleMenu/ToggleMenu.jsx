import React from "react";
import { Flex, IconButton, Button } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export const ToggleMenu = ({ display, setDisplay }) => {
  return (
    <Flex
      w="100vw"
      bgColor={Colors.DARK}
      z-index={20}
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
          onClick={() => setDisplay("none")}
        />
      </Flex>
      <Flex align="center" flexDir="column">
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" w="100%">
            ABOUT
          </Button>
        </NextLink>
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" w="100%">
            ROADMAP
          </Button>
        </NextLink>
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" w="100%">
            COLLECTION
          </Button>
        </NextLink>
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" w="100%">
            TEAM
          </Button>
        </NextLink>
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" w="100%">
            MINT
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};
