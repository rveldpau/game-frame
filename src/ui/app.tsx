import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './layout';
import "@fontsource/nunito-sans";
import "./app.scss";
import { HashRouter } from 'react-router-dom';

import "./styles.scss";

function render() {
    const container = document.getElementById("app");
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
    <QueryClientProvider client={new QueryClient()}>
        <HashRouter>
            <Layout />
        </HashRouter>
    </QueryClientProvider>);
}

render();