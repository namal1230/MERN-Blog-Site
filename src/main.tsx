import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/main.tsx';
import { Provider } from 'react-redux'
import { persistor, store } from "./utilities/store/store.ts";
import { PersistGate } from 'redux-persist/integration/react'
import { AuthProvider } from './context/AuthContext.tsx'
import AuthBootstrap from './context/AuthBootstarp.tsx';
createRoot(document.getElementById('root')!).render(
  <AuthProvider isSignedIn={false}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthBootstrap>
        <RouterProvider router={routes} />
        <App />
        </AuthBootstrap>
      </PersistGate>
    </Provider>
  </AuthProvider>
)
