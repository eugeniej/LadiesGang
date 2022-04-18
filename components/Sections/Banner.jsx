import { Flex } from "@chakra-ui/react";
import React from "react";

export const Banner = () => (
  <Flex
    backgroundImage={[
      "url('/images/static-banner-mobile.png')",
      "url('/images/static-banner-ipad.png')",
      "url('/images/static-banner.png')",
      "url('/images/static-banner.png')",
    ]}
    backgroundPosition="center"
    backgroundSize="cover"
    backgroundAttachment="fixed"
    width="100%"
    height={["500px", "500px", "600px", "600px"]}
  ></Flex>
);
