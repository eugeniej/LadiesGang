import {
  Flex,
  Button,
  useToast,
  Spinner,
  chakra,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { hasMetamask } from "../../../utils/hasMetamask";
import { useEthersProvider } from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import React from "react";
import { Colors } from "../../../utils/colors";
import { HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { ToggleMenu } from "../ToggleMenu/ToggleMenu";

export const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [display, setDisplay] = React.useState("none");
  const { account, setAccount, provider } = useEthersProvider();
  const toast = useToast();

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

  return (
    <Flex
      flex={1}
      flexDir="row"
      align="center"
      justify={["flex-end", "space-between", "center", "center"]}
      my="md"
      px={["sm", "sm", "lg", "lg"]}
      p={["1rem", "1rem", "2rem", "2rem"]}
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
      <Flex align="center" display={["none", "none", "flex", "flex"]}>
        <NextLink href="#about" passHref>
          <Button as="a" variant="ghost" w="100%">
            ABOUT
          </Button>
        </NextLink>
        <NextLink href="#roadmap" passHref>
          <Button as="a" variant="ghost" w="100%">
            ROADMAP
          </Button>
        </NextLink>
        <NextLink href="#collection" passHref>
          <Button as="a" variant="ghost" w="100%">
            COLLECTION
          </Button>
        </NextLink>
        <Image src="/ladies-gang.png" height="32" width="32" alt="" />
        <NextLink href="#team" passHref>
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
      <ToggleMenu display={display} setDisplay={setDisplay} />
      <Flex align={"center"} justify="flex-end">
        {isLoading ? (
          <Spinner />
        ) : account ? (
          <Flex
            flexDir={"column"}
            align={["center", "center", "flex-end", "flex-end"]}
          >
            <Text fontSize={15}>
              Connected Wallet :
              <chakra.span fontWeight={"bold"} color="pink.200">
                {account.substring(0, 6)}...
                {account.substring(account.length - 4, account.length)}
              </chakra.span>
            </Text>
          </Flex>
        ) : (
          <Button
            bgGradient={`linear(to-r, ${Colors.YELLOW},${Colors.PINK},${Colors.BLUE})`}
            onClick={() => connecWallet()}
            fontSize="16px"
            rounded="3xl"
          >
            CONNECT WALLET
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
