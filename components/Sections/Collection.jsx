import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Title } from "../atoms/Title";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CarouselImage } from "../molecules/CarouselImage/CarouselImage";
import { IMAGES } from "../../utils/images";

export const Collection = () => {
  return (
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
      <Text p="2rem">Here you can discover a part of our collection.</Text>
      <Flex
        justify="center"
        bgColor={Colors.DARK_GRAY}
        align="center"
        rounded="2xl"
        px="1rem"
      >
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          width="500px"
        >
          {IMAGES.map((image, key) => (
            <CarouselImage image={image.url} key={key} />
          ))}
        </Carousel>
      </Flex>
    </Flex>
  );
};
