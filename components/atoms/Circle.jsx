import { Flex } from "@chakra-ui/react";
import { Colors } from "../../utils/colors";

export const Circle = (...props) => {
  return (
    <Flex
      border="1px"
      borderInlineEndColor={Colors.BLUE}
      borderStartColor={Colors.PINK}
      borderBottomColor={Colors.BLUE}
      borderTopColor={Colors.PINK}
      height="10"
      width="10"
      rounded="full"
      justify="center"
      align="center"
      {...props}
    >
      <Flex
        backgroundColor={Colors.LIGHT_GRAY}
        height="3"
        width="3"
        rounded="full"
      ></Flex>
    </Flex>
  );
};
