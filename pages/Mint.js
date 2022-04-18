import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Layout } from "../components/organisms/Layout/Layout";
import { useEthersProvider } from "../hooks/useEthersProvider";
import Contract from "../artifacts/contracts/LadiesGangERC721A.sol/LadiesGangERC721A.json";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { Before } from "../components/Mint/Before/Before";
import { WhitelistSale } from "../components/Mint/WhiltelistSale/WhitelistSale";
import { PublicSale } from "../components/Mint/PublicSale/PublicSale";
import { SoldOut } from "../components/Mint/SoldOut/SoldOut";
import { Reveal } from "../components/Mint/Reveal/Reveal";
import { Header } from "../components/molecules/Header/Header";
import { Colors } from "../utils/colors";

export default function Mint() {
  const { account, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [sellingStep, setSellingStep] = useState(null);
  const [saleStartTime, setSaleStartTime] = useState(null);
  const [BNWlSalePrice, setBNWlSalePrice] = useState(null);
  const [wlSalePrice, setWlSalePrice] = useState(null);
  const [BNPublicSalePrice, setBNPublicSalePrice] = useState(null);
  const [publicSalePrice, setPublicSalePrice] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const contractAddress = "0x6d64cbd7c1b56a6b3d4e0179b15ad641a0a84fc4";

  useEffect(() => {
    if (account) {
      getDatas();
    }
  }, [account]);

  const getDatas = async () => {
    setIsLoading(true);
    const contract = new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
    const sellingStep = await contract.sellingStep();

    let saleStartTime = 1649614806;

    let wlSalePrice = await contract.wlSalePrice();
    let wlSalePriceBN = ethers.BigNumber.from(wlSalePrice._hex);
    wlSalePrice = ethers.utils.formatEther(wlSalePriceBN);

    let publicSalePrice = await contract.publicSalePrice();
    let publicSalePriceBN = ethers.BigNumber.from(publicSalePrice._hex);
    publicSalePrice = ethers.utils.formatEther(publicSalePriceBN);

    let totalSupply = await contract.totalSupply();
    totalSupply = totalSupply.toString();

    setSellingStep(sellingStep);
    setWlSalePrice(wlSalePrice);
    setBNWlSalePrice(wlSalePriceBN);
    setPublicSalePrice(publicSalePrice);
    setBNPublicSalePrice(publicSalePriceBN);
    setSaleStartTime(saleStartTime);
    setTotalSupply(totalSupply);
    setIsLoading(false);
  };

  return (
    <Layout
      logo={false}
      bgGradient={`linear(${Colors.DARK},${Colors.DARK},${Colors.PURPLE} ,${Colors.PURPLE})`}
    >
      <Flex
        flexDir="column"
        width="100%"
        height={["60vh", "60vh", "80vh", "80vh"]}
      >
        <Header />

        <Flex justify="center" align="center" h="100%" mt="10%">
          {isLoading ? (
            <Spinner />
          ) : account ? (
            (() => {
              console.log("switch");
              switch (sellingStep) {
                case null:
                  console.log("spinner");
                  return <Spinner />;
                case 0:
                  console.log("coucou");
                  return <Before />;
                case 1:
                  return (
                    <WhitelistSale
                      BNWlSalePrice={BNWlSalePrice}
                      wlSalePrice={wlSalePrice}
                      totalSupply={totalSupply}
                      getDatas={getDatas}
                      saleStartTime={saleStartTime}
                      contractAddress={contractAddress}
                    />
                  );
                case 2:
                  return (
                    <PublicSale
                      BNPublicSalePrice={BNPublicSalePrice}
                      publicSalePrice={publicSalePrice}
                      totalSupply={totalSupply}
                      getDatas={getDatas}
                      saleStartTime={saleStartTime}
                      contractAddress={contractAddress}
                    />
                  );
                case 3:
                  return <SoldOut totalSupply={totalSupply} />;
                case 4:
                  return <Reveal />;
                default:
                  return <Text>Connect Your Wallet</Text>;
              }
            })()
          ) : (
            <Text>Connect Your Wallet</Text>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
}
