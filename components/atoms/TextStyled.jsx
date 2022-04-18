import { Text } from "@chakra-ui/react";

export const TextStyled = ({ text, ...props }) => {
  return <Text {...props}>{text}</Text>;
};
