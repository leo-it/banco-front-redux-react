import { ThemeProvider } from "@mui/material";
import { theme } from "../src/theme";
import "../styles/globals.css";
import { wrapper, store } from "../src/store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
