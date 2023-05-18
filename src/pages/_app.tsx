import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/controller/client";
import { GlobalStyle } from "@/components/Constant/GlobalStyle";
import { colors, font } from "@/components/Constant";
import "@/styles/globals.css";
import Link from "next/link";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={colors}>
        <ThemeProvider theme={font}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
