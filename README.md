Smart Blog for Developers

Live Demo: https://smart-blog-dev.vercel.app/

A modern, interactive blog platform tailored for developers, built with React, Redux, and Firebase. This app provides a rich user experience with authentication, dynamic content, charts, and more.
---------------------------------------------------------------------------------------------------------------------------------------------
Table of Contents

Features

Technologies Used

Security & State Management

UI & Styling

Architecture

Setup & Installation

Deployment
-----------------------------------------------------------------------------------------------------------------------------------------------
Features

Firebase Authentication

Login and signup using Google, Facebook, GitHub, or Email.

Dynamic Unsplash Images

Fetch and display developer-related images using the Unsplash API.

Charts with Chart.js

Visualize blog statistics, such as views or likes.

Secure API Requests

Axios interceptors for token handling and request security.

Protected Routes

AuthGuard to restrict access to authorized users only.
------------------------------------------------------------------------------------------------------------------------------------------------
Technologies Used

Frontend: React, Redux, Redux Persist, Axios

Authentication & Security: Firebase Auth, Axios Interceptors, PersistGate

UI & Styling: Material-UI (MUI), MUI Icons

Charts & Visualization: Chart.js

Deployment: Vercel
-------------------------------------------------------------------------------------------------------------------------------------------
Security & State Management

Axios Interceptor – Automatically attaches auth tokens to API requests.

AuthGuard – Protects routes from unauthorized access.

Redux Persist – Persists state across browser reloads.

Bootstrap Auth – Ensures proper initialization of authentication before rendering the app.
---------------------------------------------------------------------------------------------------------------------------------------------
UI & Styling

The app is styled using Material-UI (MUI) for a modern and responsive design. Icons are implemented using @mui/icons-material.
----------------------------------------------------------------------------------------------------------------------------------------------
Architecture

The project wraps the entire application with providers to handle state and authentication:

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


AuthProvider – Manages authentication state.

Provider – Redux store provider.

PersistGate – Handles Redux state persistence.

AuthBootstrap – Initializes authentication before rendering routes.

RouterProvider – Handles app routing.
------------------------------------------------------------------------------------------------------------------------------------------
Setup & Installation

Clone the repository:

git clone <repo-url>
cd smart-blog-for-developers


Install dependencies:

npm install


Create a .env file and add your Firebase credentials and Unsplash API key.

Start the development server:

npm start
----------------------------------------------------------------------------------------------------------------------------------------------
Deployment

The project is deployed on Vercel:
https://smart-blog-dev.vercel.app/
----------------------------------------------------------------------------------------------------------------------------------------------
License

This project is open-source and available under the MIT License.
