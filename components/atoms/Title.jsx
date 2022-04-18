import { Text } from "@chakra-ui/react";

export const Title = ({ text, ...props }) => {
  return (
    <Text
      fontSize={["2xl", "3xl", "6xl", "6xl"]}
      {...props}
    >
      {text}
    </Text>
  );
};
