
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import {

  useQueryClient,
 
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
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
const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
