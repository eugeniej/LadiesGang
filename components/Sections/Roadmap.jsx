import React from "react";
import { Flex } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";
import { Title } from "../atoms/Title";
import { TimelineItem } from "../molecules/TimelineItem/TimelineItem";

const Timeline = () => {
  const timelineEvents = [
    "Whitelisting Giveaways",
    "Pre-sale for Whitelisted members",
    "Public sale",
    "Welcome to the club",
    "Events & Launch Party",
  ];

  return (
    <Flex
      flexDir="column"
      align="flex-start"
      width="60%"
      _after={{
        content: '""',
        backgroundColor: Colors.DARK_GRAY,
        position: "absolute",
        left: "50%",
        width: "4px",
        height: "100vh",
      }}
    >
      {timelineEvents.map((event, key) => (
        <TimelineItem text={event} key={key} />
      ))}
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
      p="2rem"
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
