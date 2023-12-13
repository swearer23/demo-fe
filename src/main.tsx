import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LinearOptimization from './pages/LinearOptimization/index.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "linear-optimization",
    element: <LinearOptimization />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
