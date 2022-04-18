import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
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
import {
  About,
  Banner,
  Collection,
  Roadmap,
  Team,
  Home as HomeSection,
} from "../components/Sections";

export default function Home() {
  const { account, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [sellingStep, setSellingStep] = useState(null);
  const [saleStartTime, setSaleStartTime] = useState(null);
  const [BNWlSalePrice, setBNWlSalePrice] = useState(null);
  const [wlSalePrice, setWlSalePrice] = useState(null);
  const [BNPublicSalePrice, setBNPublicSalePrice] = useState(null);
  const [publicSalePrice, setPublicSalePrice] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const toast = useToast();
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
    <Layout>
      <Flex align={"center"} justify="center">
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
          <Flex flexDir={"column"}>
            <HomeSection />
            <About />
            <Roadmap />
            <Collection />
            <Banner />
            <Team />
          </Flex>
        )}
      </Flex>
    </Layout>
  );
}
