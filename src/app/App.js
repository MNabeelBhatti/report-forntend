import React, { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import JumboApp from "@jumbo/components/JumboApp";
import AppLayout from "./AppLayout";
import JumboTheme from "@jumbo/components/JumboTheme";
import AppRoutes from "./AppRoutes";
import configureStore, { history } from './redux/store';
import JumboDialog from "@jumbo/components/JumboDialog";
import JumboDialogProvider from "@jumbo/components/JumboDialog/JumboDialogProvider";
import { SnackbarProvider } from "notistack";
import "./services/apis";
import AppProvider from "./AppProvider";
import { config } from "./config/main";
import JumboRTL from "@jumbo/JumboRTL/JumboRTL";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import { supabase } from "../supabaseClient";
import { onAuth } from "./redux/actions/auth";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const store = configureStore();

function App() {
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            onAuth(session)
            store.dispatch(onAuth(session))
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            store.dispatch(onAuth(session))
        })
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter history={history}>
                    <AppProvider>
                        <JumboApp activeLayout={config.activeLayout}>
                            <JumboTheme init={config.theme}>
                                <JumboRTL>
                                    <JumboDialogProvider>
                                        <JumboDialog />
                                        <SnackbarProvider
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            maxSnack={3}>

                                            <AppLayout>
                                                <Suspense
                                                    fallback={
                                                        <Div
                                                            sx={{
                                                                display: 'flex',
                                                                minWidth: 0,
                                                                alignItems: 'center',
                                                                alignContent: 'center',
                                                                height: '100%',
                                                            }}
                                                        >
                                                            <CircularProgress sx={{ m: '-40px auto 0' }} />
                                                        </Div>
                                                    }
                                                >
                                                    <AppRoutes/>
                                                </Suspense>
                                            </AppLayout>

                                        </SnackbarProvider>
                                    </JumboDialogProvider>
                                </JumboRTL>
                            </JumboTheme>
                        </JumboApp>
                    </AppProvider>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
