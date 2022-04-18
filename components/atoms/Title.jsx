import { Text } from "@chakra-ui/react";

export const Title = ({ text, ...props }) => {
  return (
    <Text
      fontSize={["2xl", "3xl", "5xl", "6xl"]}
      fontFamily="Akshar"
      {...props}
    >
      {text}
    </Text>
  );
};
