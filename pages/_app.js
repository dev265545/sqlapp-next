import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <html lang="en">
      <head>{/* Other head elements go here */}</head>
      <body>
        {/* Render the main component */}
        <Component {...pageProps} />
      </body>
    </html>
  );
}

export default MyApp;
