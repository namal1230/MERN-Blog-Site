Smart Blog for Developers
---------------------------------------------------------------------------------------------------------------------------------------------
Live Demo: https://smart-blog-dev.vercel.app/

A modern, interactive blog platform tailored for developers, built with React, Redux, and Firebase. This app provides a rich user experience with authentication, dynamic content, charts, and more.

Images
-----------------------------------------------------------------------------------------------------------------------------------------


<img width="1072" height="844" alt="Screenshot 2026-01-15 220820" src="https://github.com/user-attachments/assets/ab4ac7d1-d975-41ec-98ce-e93a4ced2de3" />
<img width="1075" height="1341" alt="Screenshot 2026-01-15 221148" src="https://github.com/user-attachments/assets/d4376e09-a762-478c-97bd-470f3b6a2b49" />
<img width="1080" height="1195" alt="Screenshot 2026-01-15 221220" src="https://github.com/user-attachments/assets/e970ffb7-7526-41ab-a8d9-7abde6747533" />
<img width="1051" height="1269" alt="Screenshot 2026-01-15 221304" src="https://github.com/user-attachments/assets/84b80c7b-0230-4cfc-b934-4b12c3771766" />
<img width="1081" height="601" alt="Screenshot 2026-01-15 221351" src="https://github.com/user-attachments/assets/261f63c7-b5a3-45ac-9b3f-36f6db265e05" />
<img width="1311" height="556" alt="Screenshot 2026-01-15 221453" src="https://github.com/user-attachments/assets/ead12c9b-8cbe-4808-b253-0f76bd6aa515" />
<img width="1331" height="551" alt="Screenshot 2026-01-15 221559" src="https://github.com/user-attachments/assets/ffa6b4bf-69c3-4194-bc20-4f3abeb3166e" />
<img width="1366" height="587" alt="Screenshot 2026-01-15 221617" src="https://github.com/user-attachments/assets/49c829ef-39b4-49d1-b84c-6f40c57cb1de" />
<img width="1289" height="574" alt="Screenshot 2026-01-15 221813" src="https://github.com/user-attachments/assets/b1be67f5-2993-46fd-9b88-18e6355f8992" />
<img width="1074" height="535" alt="Screenshot 2026-01-15 222008" src="https://github.com/user-attachments/assets/3c62c233-999e-468d-9fbb-4b35057579b1" />






Table of Contents
---------------------------------------------------------------------------------------------------------------------------------------------
Features

Technologies Used

Security & State Management

UI & Styling

Architecture

Setup & Installation

Deployment

Features
---------------------------------------------------------------------------------------------------------------------------------------------
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

Technologies Used
---------------------------------------------------------------------------------------------------------------------------------------------
Frontend: React, Redux, Redux Persist, Axios

Authentication & Security: Firebase Auth, Axios Interceptors, PersistGate

UI & Styling: Material-UI (MUI), MUI Icons

Charts & Visualization: Chart.js

Deployment: Vercel

Security & State Management
---------------------------------------------------------------------------------------------------------------------------------------------
Axios Interceptor – Automatically attaches auth tokens to API requests.

AuthGuard – Protects routes from unauthorized access.

Redux Persist – Persists state across browser reloads.

Bootstrap Auth – Ensures proper initialization of authentication before rendering the app.

UI & Styling
---------------------------------------------------------------------------------------------------------------------------------------------
The app is styled using Material-UI (MUI) for a modern and responsive design. Icons are implemented using @mui/icons-material.

Architecture
---------------------------------------------------------------------------------------------------------------------------------------------
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

Setup & Installation
---------------------------------------------------------------------------------------------------------------------------------------------
Clone the repository:

git clone <repo-url>
cd smart-blog-for-developers


Install dependencies:

npm install


Create a .env file and add your Firebase credentials and Unsplash API key.

Start the development server:

npm start

Deployment
---------------------------------------------------------------------------------------------------------------------------------------------
The project is deployed on Vercel:
https://smart-blog-dev.vercel.app/

License
---------------------------------------------------------------------------------------------------------------------------------------------
This project is open-source and available under the MIT License.
