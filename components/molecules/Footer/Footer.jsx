import { Flex, Image, Link, Text } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <Flex
      align="center"
      justify="center"
      flexDir="column"
      my="sm"
      p="2rem"
      bgColor={Colors.PURPLE}
    >
      <Image src="/ladies-gang.png" height="32" width="32" alt="" />
      <Flex flexDir="row" justify="center" align="center" pt="1rem">
        <Link px="1rem" href="https://www.instagram.com/ladies_gang.nft/?hl=fr">
          <FaInstagram size="18px" color={Colors.WHITE} />
        </Link>
        <Link px="1rem" href="https://twitter.com/ladies_gang">
          <FaTwitter size="18px" color={Colors.WHITE} />
        </Link>
      </Flex>
      <Flex
        flexDir={["column", "column", "row", "row"]}
        width="60%"
        justify="space-around"
        align="center"
        p="2rem"
      >
        <Link href="#home" color={Colors.WHITE}>
          HOME
        </Link>
        <Link href="#about" color={Colors.WHITE}>
          ABOUT
        </Link>
        <Link href="#roadmap" color={Colors.WHITE}>
          ROADMAP
        </Link>
        <Link href="#collection" color={Colors.WHITE}>
          COLLECTION
        </Link>
        <Link href="#team" color={Colors.WHITE}>
          TEAM
        </Link>
        <Link color={Colors.WHITE} href="#">
          MINT
        </Link>
      </Flex>
      <Text fontSize={12} fontWeight={400} color={Colors.LIGHT_GRAY}>
        Copyright &copy; {new Date().getFullYear()}, All rights reserved -
        Ladies Gang
      </Text>
    </Flex>
  );
};
