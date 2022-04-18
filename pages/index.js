import { Flex, Text, keyframes } from "@chakra-ui/react";
import { Layout } from "../components/organisms/Layout/Layout";
import React from "react";
import { motion } from "framer-motion";

import {
  About,
  Banner,
  Collection,
  Roadmap,
  Team,
  Home as HomeSection,
} from "../components/Sections";

export default function Home() {
  const animationKeyframes = keyframes`
  0% {
   transform: translate3d(0,-200%,0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-90deg) ;      
 }
 100% {
   transform: translate3d(0,2000%,0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-90deg) ; 
 }
 `;
  const animation = `${animationKeyframes} 8s linear infinite`;

  return (
    <Layout>
      <Flex align={"center"} justify="center">
        <Flex flexDir={"column"}>
          <HomeSection />
          <Flex flexDir="column" position="relative" overflow="hidden">
            <Flex
              position="absolute"
              top="0"
              left="-48"
              width="8rem"
              display={["none", "none", "flex", "flex"]}
            >
              <Text
                as={motion.Text}
                animation={animation}
                fontSize="8xl"
                fontWeight="extrabold"
                color="rgba(35, 35, 53, 0.50)"
                fontFamily="Akshar"
              >
                LADIES{"\u00A0"}GANG
              </Text>
            </Flex>
            <About />
            <Roadmap />
            <Collection />
          </Flex>
          <Banner />
          <Team />
        </Flex>
      </Flex>
    </Layout>
  );
}
