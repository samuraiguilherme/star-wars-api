import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import React from 'react';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { SearchContextProvider } from './contexts/searchContext';

const queryClient = new QueryClient();

createInertiaApp({
  resolve: name => resolvePageComponent(
    `./Pages/${name}.jsx`,
    import.meta.glob('./Pages/**/*.jsx')
  ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <App {...props} />
        </SearchContextProvider>
      </QueryClientProvider>
    );
  },
})