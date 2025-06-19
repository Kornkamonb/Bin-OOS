import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getThemeColors, observeThemeChanges } from "./themeUtils";
import { useState, useEffect } from "react";

import {
  ThemeProvider as ThemeProvider_mui,
  createTheme,
} from "@mui/material/styles";
// Lazy load components
const Home = React.lazy(() => import("@/pages/Homepage/Homepage"));

function App() {
  const [themeColors, setThemeColors] = useState<any>({});

  useEffect(() => {
    const updateColors = () => {
      setThemeColors(getThemeColors()); // ดึงค่าทั้งหมดแล้วเก็บลง state
    };
    updateColors();
    const observer = observeThemeChanges(updateColors);
    return () => observer.disconnect();
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 375,
        sm: 534,
        md: 640,
        lg: 1072,
        xl: 1520,
      },
    },
    typography: {
      fontFamily: "'Inter Variable', 'sans-serif'",
    },
    palette: {
      primary: { main: themeColors["primary"] || "#007bff" },
      secondary: { main: themeColors["secondary"] || "#6c757d" },
      // accent: { main: themeColors["accent"] || "#ff5722" },
      // neutral: { main: themeColors["neutral"] || "#3d4451" },
      error: { main: themeColors["error"] || "#dc3545" },
      warning: { main: themeColors["warning"] || "#ffc107" },
      info: { main: themeColors["info"] || "#17a2b8" },
      success: { main: themeColors["success"] || "#28a745" },
      background: {
        default: themeColors["base-100"] || "#ffffff",
        paper: themeColors["base-100"] || "#f5f5f5",
      },
      text: {
        primary: themeColors["base-content"] || "#212529",
        secondary: themeColors["base-content"] || "#212529",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            border: `1px solid ${themeColors["base-300"] || "#e5e7eb"}`, // เส้นขอบของ Paper (Card, Dialog ฯลฯ)
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: themeColors["primary"] || "inherit", // ใช้สี icon ตาม theme
          },
        },
      },
    },
  });
  return (
    <ThemeProvider_mui theme={theme}>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/template-typescript" element={<Layout />}>
                {/* Public Routes */}
                <Route
                  index
                  element={
                    <Navigate to="/template-typescript/homepage" replace />
                  }
                />
                <Route
                  path="/template-typescript/homepage"
                  element={<Home />}
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        {/* <Snowfall snowflakeCount={20} /> */}
      </ThemeProvider>
    </ThemeProvider_mui>
  );
}

export default App;
