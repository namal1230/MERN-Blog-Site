import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/main.ts';
import { Provider } from 'react-redux'
import { persistor, store } from "./utilities/store/store.ts";
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from './context/AuthContext.tsx'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
        <App />
      </PersistGate>
    </Provider>
  </AuthProvider>

  // </StrictMode>,
)
