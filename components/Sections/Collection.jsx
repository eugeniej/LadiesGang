import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Title } from "../atoms/Title";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CarouselImage } from "../molecules/CarouselImage/CarouselImage";
import { IMAGES } from "../../utils/images";
import Image from "next/image";

export const Collection = () => (
  <Flex
    id="collection"
    fontWeight="bold"
    justify="center"
    flexDir="column"
    align="center"
    my="md"
    px={["sm", "sm", "lg", "lg"]}
    p="2rem"
    mb="4rem"
  >
    <Title
      text="COLLECTION"
      color={Colors.YELLOW}
      mt={["0", "0", "2rem", "2rem"]}
    />
    <Flex
      justify="center"
      bgColor={Colors.DARK_GRAY}
      align="center"
      rounded="2xl"
      px="3rem"
      mt="2rem"
      maxW="600px"
      p="2rem"
    >
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        dynamicHeight={false}
      >
        {IMAGES.map((image, key) => (
          <Box key={key}>
            <CarouselImage image={image.url} />
          </Box>
        ))}
      </Carousel>
    </Flex>
  </Flex>
);
