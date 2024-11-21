import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AddQuiz from './pages/AddQuiz'
import ViewQuiz from './pages/ViewQuiz'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzYKjNNfFVMeT8xZi2II099xirD1lLhgo",
  authDomain: "wsjp-61.firebaseapp.com",
  databaseURL: "https://wsjp-61-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wsjp-61",
  storageBucket: "wsjp-61.firebasestorage.app",
  messagingSenderId: "183692651650",
  appId: "1:183692651650:web:cdcd2f74a50679cfe4989b",
  measurementId: "G-7TSXTZN6TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add-quiz",
          element: <AddQuiz/>,
        },
        {
          path: "/view-quiz",
          element: <ViewQuiz/>,
        }
      ]
    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }

  ])
  return (
    <RouterProvider router={router} />
  )
}
