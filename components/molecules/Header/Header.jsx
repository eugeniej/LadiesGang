import {
  Flex,
  Button,
  useToast,
  Spinner,
  chakra,
  Text,
  Image,
  IconButton,
  keyframes,
  Link,
} from "@chakra-ui/react";
import { hasMetamask } from "../../../utils/hasMetamask";
import { useEthersProvider } from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import React from "react";
import { Colors } from "../../../utils/colors";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ToggleMenu } from "../ToggleMenu/ToggleMenu";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [display, setDisplay] = React.useState("none");
  const { account, setAccount, provider } = useEthersProvider();
  const toast = useToast();
  const { route } = useRouter();
  const isOnHome = route === "/";

  const connecWallet = async () => {
    if (!hasMetamask) {
      toast({
        description: "Please install Metamask browser extension and retry",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      if (provider) {
        let network = await provider.getNetwork();
        // To change to === 1 before publicate the app. The user should be connected to the real blockchain
        if (network.chainId !== 1) {
          const resultAccount = await provider.send("eth_requestAccounts", []);
          setAccount(ethers.utils.getAddress(resultAccount[0]));
          setIsLoading(false);
          toast({
            description: "Your wallet has been successfully connected",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      } else {
        setAccount(null);
        setIsLoading(false);
        toast({
          description: "Please switch to Main Ethereum Network on Metamask",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const animationKeyframes = keyframes`
    0% { transform: scale(1) }
    50% { transform: scale(1.5) }
    100% { transform: scale(1) }
 `;

  const animation = `${animationKeyframes} 2s ease-in-out `;

  return (
    <Flex
      flexDir="row"
      align="center"
      justify={["flex-end", "flex-end", "center", "center"]}
      my="md"
      px={["sm", "sm", "lg", "lg"]}
      p={["1.5rem", "1.5rem", "2rem", "2rem"]}
      width={"100%"}
    >
      <IconButton
        position="fixed"
        top={5}
        left={5}
        aria-label="Open Menu"
        size="lg"
        mr="2"
        icon={<HamburgerIcon />}
        color={Colors.WHITE}
        display={["flex", "flex", "none", "none"]}
        onClick={() => setDisplay("flex")}
      />
      <Flex
        align="center"
        justify="space-around"
        display={["none", "none", "flex", "flex"]}
        width={"100%"}
      >
        <Link
          href={isOnHome ? "#about" : "/#about"}
          passHref
          fontSize={["12px", "12px", "16px", "20px"]}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          ABOUT
        </Link>
        <Link
          href={isOnHome ? "#roadmap" : "/#roadmap"}
          passHref
          fontSize={["12px", "12px", "16px", "20px"]}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          ROADMAP
        </Link>
        <Link
          href={isOnHome ? "#collection" : "/#collection"}
          passHref
          fontSize={["12px", "12px", "16px", "20px"]}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          COLLECTION
        </Link>
        <Image
          as={motion.img}
          animation={animation}
          src="/ladies-gang.png"
          height={["20", "20", "24", "32"]}
          width={["20", "20", "24", "32"]}
          alt=""
        />
        <Link
          href={isOnHome ? "#team" : "/#team"}
          passHref
          fontSize={["12px", "12px", "16px", "20px"]}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          THE TEAM
        </Link>
        <Link
          href={isOnHome ? "/Mint" : "/"}
          passHref
          fontSize={["12px", "12px", "16px", "20px"]}
          fontFamily="Akshar"
          _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
        >
          {isOnHome ? "MINT" : "HOME"}
        </Link>
      </Flex>
      <ToggleMenu display={display} setDisplay={setDisplay} />
      <Flex align={"center"}>
        {isLoading ? (
          <Spinner />
        ) : account ? (
          <Flex
            flexDir={"column"}
            align={["center", "center", "flex-end", "flex-end"]}
          >
            <Text fontSize={15} color={Colors.WHITE}>
              Connected Wallet :
              <chakra.span fontWeight={"bold"} color={Colors.BLUE}>
                {account.substring(0, 6)}...
                {account.substring(account.length - 4, account.length)}
              </chakra.span>
            </Text>
          </Flex>
        ) : (
          <Button
            bgGradient={`linear(to-r, ${Colors.YELLOW},${Colors.PINK},${Colors.BLUE})`}
            onClick={() => connecWallet()}
            fontSize={["16px", "16px", "16px", "20px"]}
            rounded="3xl"
            width={["36", "36", "36", "52"]}
            fontFamily="Akshar"
            _hover={{ transform: "scale(1.2)", textDecoration: "none" }}
          >
            CONNECT WALLET
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
