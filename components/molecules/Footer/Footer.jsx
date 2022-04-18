import { Flex, Image, Link, Text } from "@chakra-ui/react";
import { Colors } from "../../../utils/colors";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

export const Footer = ({ logo = true }) => {
  const { route } = useRouter();

  const isOnHome = route === "/";

  return (
    <Flex
      align="center"
      justify="center"
      flexDir="column"
      my="sm"
      p="2rem"
      bgColor={Colors.PURPLE}
    >
      {logo && <Image src="/ladies-gang.png" height="32" width="32" alt="" />}
      <Flex flexDir="row" justify="center" align="center" pt="1rem">
        <Link
          px="1rem"
          href="https://www.instagram.com/ladies_gang.nft/?hl=fr"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          <FaInstagram size="18px" color={Colors.WHITE} />
        </Link>
        <Link
          px="1rem"
          href="https://twitter.com/ladies_gang"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
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
        <Link
          href="/"
          color={Colors.WHITE}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          HOME
        </Link>
        <Link
          href={route === "/" ? "#about" : "/#about"}
          color={Colors.WHITE}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          ABOUT
        </Link>
        <Link
          href={isOnHome ? "#roadmap" : "/#roadmap"}
          color={Colors.WHITE}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          ROADMAP
        </Link>
        <Link
          href={isOnHome ? "#collection" : "/#collection"}
          color={Colors.WHITE}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          COLLECTION
        </Link>
        <Link
          href={isOnHome ? "#team" : "/#team"}
          color={Colors.WHITE}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          THE TEAM
        </Link>
        <Link
          color={Colors.WHITE}
          href="/Mint"
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
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
