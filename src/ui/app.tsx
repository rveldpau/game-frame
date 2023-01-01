import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IPCAPIHelpers, LaunchGameEvent } from '../ipc/api';
import { GameList } from '../games/ui/GameList';
import { Layout } from './layout';

function render() {
    const container = document.getElementById("app");
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
    <QueryClientProvider client={new QueryClient()}>
        <Layout />
    </QueryClientProvider>);
}

render();