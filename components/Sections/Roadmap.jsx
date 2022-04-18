import React from "react";
import { Flex } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Title } from "../atoms/Title";
import { TimelineItem } from "../molecules/TimelineItem/TimelineItem";

const Timeline = () => {
  const timelineEvents = [
    {
      title: "Whitelisting Giveaways",
      text: "Ladies Gang is a group of strong and fulfilled women. We are here to stick together and help us find new opportunities as well as new perspectives. ",
    },
    {
      title: "Pre-sale for Whitelisted members",
      text: "Ladies Gang is a group of strong and fulfilled women. We are here to stick together and help us find new opportunities as well as new perspectives. ",
    },
    {
      title: "Public sale",
      text: "Ladies Gang is a group of strong and fulfilled women. We are here to stick together and help us find new opportunities as well as new perspectives. ",
    },
    {
      title: "Welcome to the club",
      text: "Ladies Gang is a group of strong and fulfilled women. We are here to stick together and help us find new opportunities as well as new perspectives. ",
    },
    {
      title: "Events & Launch Party",
      text: "Ladies Gang is a group of strong and fulfilled women. We are here to stick together and help us find new opportunities as well as new perspectives. ",
    },
  ];

  return (
    <Flex position="relative" align="center" justify="center">
      <Flex
        flexDir="column"
        align="flex-start"
        p={["1rem", "1rem", "1.5rem", "2rem"]}
        width={["100%", "100%", "70%", "70%"]}
        _after={{
          content: '""',
          backgroundColor: Colors.DARK_GRAY,
          position: "absolute",
          width: "4px",
          height: "90%",
          marginTop: "10",
          marginBottom: "10",
        }}
      >
        {timelineEvents.map((event, key) => (
          <TimelineItem title={event.title} text={event.text} key={key} />
        ))}
      </Flex>
    </Flex>
  );
};

export const Roadmap = (props) => {
  return (
    <Flex
      id="roadmap"
      fontWeight="bold"
      justify="center"
      flexDir="column"
      align="center"
      my="md"
      px={["sm", "sm", "lg", "lg"]}
      p={["1rem", "1rem", "1.5rem", "2rem"]}
    >
      <Title
        text="ROADMAP"
        color={Colors.BLUE}
        mt={["0", "0", "2rem", "2rem"]}
      />
      <Timeline />
    </Flex>
  );
};
