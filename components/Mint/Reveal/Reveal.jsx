import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getCount } from "../../../utils/getCount";

export const Reveal = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [seconds, setSeconds] = React.useState(null);
  const [minutes, setMinutes] = React.useState(null);
  const [hours, setHours] = React.useState(null);
  const [days, setDays] = React.useState(null);

  let revealStartTime = 1649887200;

  React.useEffect(() => {
    setIsLoading(true);
    getCount({
      revealStartTime,
      setDays,
      setHours,
      setMinutes,
      setSeconds,
    });
    setIsLoading(false);
  }, []);

  console.log("days", days);

  return (
    <Flex fontWeight={"bold"}>
      {days >= 0 ? (
        <Flex direction={"column"} align="center">
          <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
            Reveal starts in
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
        <Text fontSize={["1.5rem", "1.5rem", "2rem", "3rem"]}>
          The collection has been revealed!
        </Text>
      )}
    </Flex>
  );
};
