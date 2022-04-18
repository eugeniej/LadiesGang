import React from "react";
import {
  Flex,
  Text,
  Image,
  Button,
  Spinner,
  useToast,
  chakra,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/LadiesGangERC721A.sol/LadiesGangERC721A.json";
import tokens from "../../../tokens.json";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { getCount } from "../../../utils/getCount";
import { useEthersProvider } from "../../../hooks/useEthersProvider";

export const WhitelistSale = ({
  BNWlSalePrice,
  wlSalePrice,
  totalSupply,
  getDatas,
  saleStartTime,
  contractAddress,
}) => {
  const { account, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = React.useState(false);
  const [mintIsLoading, setMintIsLoading] = React.useState(false);
  const [seconds, setSeconds] = React.useState(null);
  const [minutes, setMinutes] = React.useState(null);
  const [hours, setHours] = React.useState(null);
  const [days, setDays] = React.useState(null);
  const [timestamp, setTimestamp] = React.useState(
    Math.floor(Date.now() / 1000)
  );
  const toast = useToast();
  const endSaleTime = saleStartTime + 12 * 3600;

  React.useEffect(() => {
    setIsLoading(true);
    getCount({ saleStartTime, setDays, setHours, setMinutes, setSeconds });
    setIsLoading(false);
  }, []);

  const mint = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
    let tab = [];
    tokens.map((token) => {
      tab.push(token.address);
    });
    const leaves = tab.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const leaf = keccak256(account);
    let proof = tree.getHexProof(leaf);

    let overrides = {
      value: BNWlSalePrice,
    };

    try {
      let transaction = await contract.whitelistMint(
        account,
        1,
        proof,
        overrides
      );
      setMintIsLoading(true);
      await transaction.wait();
      setMintIsLoading(false);
      toast({
        description: "Congratulations, you have linted your NFT",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      getDatas();
    } catch {
      toast({
        description: "Oups.. an error occured",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex fontWeight={"bold"}>
      <Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <Flex>
            {days >= 0 ? (
              <Flex direction={"column"} align="center">
                <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
                  Whitelist Sale starts in
                </Text>
                <Flex align={"center"} justify="center" p="2rem">
                  <Flex
                    direction={"column"}
                    justify="center"
                    align={"center"}
                    p={["1rem", "1rem", "2rem", "2rem"]}
                  >
                    <Text
                      fontWeight={"bold"}
                      fontSize={["2rem", "2rem", "5rem", "5rem"]}
                    >
                      {days}
                    </Text>
                    <Text fontStyle={"italic"}>Days</Text>
                  </Flex>
                  <Flex
                    direction={"column"}
                    justify="center"
                    align={"center"}
                    p={["1rem", "1rem", "2rem", "2rem"]}
                  >
                    <Text
                      fontWeight={"bold"}
                      fontSize={["2rem", "2rem", "5rem", "5rem"]}
                    >
                      {hours}
                    </Text>
                    <Text fontStyle={"italic"}>Hours</Text>
                  </Flex>
                  <Flex
                    direction={"column"}
                    justify="center"
                    align={"center"}
                    p={["1rem", "1rem", "2rem", "2rem"]}
                  >
                    <Text
                      fontWeight={"bold"}
                      fontSize={["2rem", "2rem", "5rem", "5rem"]}
                    >
                      {minutes}
                    </Text>
                    <Text fontStyle={"italic"}>Mins</Text>
                  </Flex>
                  <Flex
                    direction={"column"}
                    justify="center"
                    align={"center"}
                    p={["1rem", "1rem", "2rem", "2rem"]}
                  >
                    <Text
                      fontWeight={"bold"}
                      fontSize={["2rem", "2rem", "5rem", "5rem"]}
                    >
                      {seconds}
                    </Text>
                    <Text fontStyle={"italic"}>Secs</Text>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Flex>
                {timestamp > endSaleTime ? (
                  <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
                    Whitelist Sale is finished
                  </Text>
                ) : (
                  <Flex>
                    {mintIsLoading ? (
                      <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
                        <Spinner />
                        Processing mint...
                      </Text>
                    ) : (
                      <Flex>
                        {totalSupply >= 2000 ? (
                          <Flex>
                            <Text
                              fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}
                            >
                              Whitelist Sale is sold out
                            </Text>
                          </Flex>
                        ) : (
                          <Flex align={"center"} direction={"column"}>
                            <Flex
                              width={"100%"}
                              justify="center"
                              align={"center"}
                              p={["2rem", "2rem", "0", "0"]}
                            >
                              <Image
                                src="/images/banner.png"
                                width={"60%"}
                                alt="Banner Whitelist"
                              />
                            </Flex>
                            <Flex
                              width={"100%"}
                              justify="center"
                              align={"center"}
                              direction={"column"}
                            >
                              <Text
                                fontWeight={"bold"}
                                fontSize={["2rem", "2rem", "3rem", "4rem"]}
                              >
                                Whitelist Sale
                              </Text>
                              <Text
                                fontWeight={"bold"}
                                fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}
                              >
                                <chakra.span fontWeight={"bold"}>
                                  NFTs sold :
                                </chakra.span>
                                <chakra.span fontWeight={"bold"} color="purple">
                                  {totalSupply} / 2000
                                </chakra.span>
                              </Text>
                              <Text fontSize={"1.5rem"}>
                                <chakra.span fontWeight={"bold"}>
                                  Price :
                                </chakra.span>
                                <chakra.span fontWeight={"bold"} color="purple">
                                  {wlSalePrice} Eth
                                </chakra.span>
                                / NFT
                              </Text>
                              <Flex mt="2rem">
                                <Button colorScheme={"purple"} onClick={mint}>
                                  Buy one NFT
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                        )}
                      </Flex>
                    )}
                  </Flex>
                )}
              </Flex>
            )}
          </Flex>
        )}
      </Text>
    </Flex>
  );
};
