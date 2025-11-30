
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { darkTheme, lightTheme } from "./Them.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

function AppWrapper() {
  const mode = useSelector(state=>state.theme.mode)
  const theme = mode === 'light' ? lightTheme: darkTheme;
console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
