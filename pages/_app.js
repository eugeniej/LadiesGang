import { ChakraProvider } from "@chakra-ui/react";
import { EthersProvider } from "../context/ethersProviderContext";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <EthersProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </EthersProvider>
  );
}

export default MyApp;
