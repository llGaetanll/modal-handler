import React from "react";
import Head from "next/head";

import CssBaseline from "@material-ui/core/CssBaseline";

import { FeedbackProvider } from "../util/feedback";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Modal Handler</title>
      </Head>
      <CssBaseline />
      <FeedbackProvider>
        <Component {...pageProps} />
      </FeedbackProvider>
    </>
  );
};

export default MyApp;
