import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

const height = { height: "100%" };

export default class MyDocument extends Document {
  render() {
    return (
      <Html style={height}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css2?&family=Inter&family=Roboto:wght@500&display=swap"
            rel="stylesheet"
          />
          <style>{`
						#__next {
              height: 100%;
              display: flex;
						}
					`}</style>
        </Head>
        <body style={height}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...initialProps.styles, sheets.getStyleElement()]
  };
};
