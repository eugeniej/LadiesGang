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
import { useEthersProvider } from "../../../hooks/useEthersProvider";
import { ethers } from "ethers";
import Contract from "../../../artifacts/contracts/LadiesGangERC721A.sol/LadiesGangERC721A.json";
import { getCount } from "../../../utils/getCount";

export const PublicSale = ({
  BNPublicSalePrice,
  publicSalePrice,
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

  const publicSaleStartTime = saleStartTime + 24 * 3600;
  const toast = useToast();

  React.useEffect(() => {
    setIsLoading(true);
    getCount({
      publicSaleStartTime,
      setDays,
      setHours,
      setMinutes,
      setSeconds,
    });
    setIsLoading(false);
  }, []);

  const mint = async (quantity) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Contract.abi, signer);

    let overrides = {
      value: BNPublicSalePrice.mul(quantity),
    };

    try {
      let transaction = await contract.publicMint(account, quantity, overrides);
      setMintIsLoading(true);
      await transaction.wait();
      setMintIsLoading(false);
      toast({
        description: "Congratulations, you have minted your NFT",
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
                  Public Sale starts in
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
                <Flex>
                  {mintIsLoading ? (
                    <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
                      <Spinner />
                      Processing mint...
                    </Text>
                  ) : (
                    <Flex>
                      {totalSupply >= 5000 ? (
                        <Flex>
                          <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
                            Public Sale is sold out
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
                              Public Sale
                            </Text>
                            <Text
                              fontWeight={"bold"}
                              fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}
                            >
                              <chakra.span fontWeight={"bold"}>
                                NFTs sold :
                              </chakra.span>
                              <chakra.span fontWeight={"bold"} color="purple">
                                {totalSupply} / 5000
                              </chakra.span>
                            </Text>
                            <Text fontSize={"1.5rem"}>
                              <chakra.span fontWeight={"bold"}>
                                Price :
                              </chakra.span>
                              <chakra.span fontWeight={"bold"} color="purple">
                                {publicSalePrice} Eth
                              </chakra.span>
                              / NFT
                            </Text>
                            <Flex mt="2rem">
                              <Button
                                colorScheme={"purple"}
                                onClick={() => mint(1)}
                              >
                                Buy one NFT
                              </Button>
                              <Button
                                colorScheme={"purple"}
                                onClick={() => mint(2)}
                              >
                                Buy 2 NFT
                              </Button>
                              <Button
                                colorScheme={"purple"}
                                onClick={() => mint(3)}
                              >
                                Buy 3 NFT
                              </Button>
                            </Flex>
                          </Flex>
                        </Flex>
                      )}
                    </Flex>
                  )}
                </Flex>
              </Flex>
            )}
          </Flex>
        )}
      </Text>
    </Flex>
  );
};
