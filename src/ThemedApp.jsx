import { createContext, useState, useContext, useMemo, useEffect } from "react";

import {
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material"

import { deepPurple, amber, cyan, teal, lime, yellow, red, grey } from "@mui/material/colors";

// * For routing
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"

import Template from "./Template.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Comments from "./pages/Comments.jsx";
import Likes from "./pages/Likes.jsx";
import Search from "./pages/Search.jsx";
import Notis from "./pages/Notis.jsx";

import { fetchVerify } from "./libs/fetcher.js";

import { QueryClientProvider, QueryClient } from "react-query";
import AppSocket from "./AppSocket.jsx";


// * Create Context
export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

// * Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,

        // * Nested Routes (use with Outlet)
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/profile/:id",
                element: <Profile />,
            },
            {
                path: "/comments/:id",
                element: <Comments />,
            },
            {
                path: "/likes/:id/:type",
                element: <Likes />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/notis",
                element: <Notis />,
            },
        ],
    },
]);

// * For Data Fetching
export const queryClient = new QueryClient();

export default function ThemedApp() {

    // * State
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("dark");
    const [globalMsg, setGlobalMsg] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        fetchVerify().then(user => {
            if (user) setAuth(user);
        });
    }, []);

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                primary: red,
                banner: mode === "dark" ? grey[800] : grey[200],
                text: {
                    fade: grey[500],
                }
            },
        });
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>

            <AppContext.Provider
                value={{
                    showForm,
                    setShowForm,
                    mode,
                    setMode,
                    showDrawer,
                    setShowDrawer,
                    globalMsg,
                    setGlobalMsg,
                    auth,
                    setAuth,
                }}
            >

                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <AppSocket />
                </QueryClientProvider>


                {/* For MUI Theme work and CSS reset */}
                <CssBaseline />

            </AppContext.Provider>

        </ThemeProvider>
    );
}

