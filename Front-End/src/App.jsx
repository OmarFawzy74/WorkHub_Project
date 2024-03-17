import React from 'react'; 
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './Pages/home/Home';
import Gigs from './Pages/gigs/Gigs';
import Gig from './Pages/gig/Gig';
import Add from './Pages/add/Add';
import Orders from './Pages/orders/Orders';
import Messages from './Pages/messages/Messages';
import Message from './Pages/message/Message';
import MyGigs from './Pages/myGigs/MyGigs';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import './App.scss'
import Login from './Pages/login/Login';
import PrivacyPolicy from './Pages/privacy/PrivacyPolicy';
import ContactUs from './Pages/contactUs/ContactUs';
import Register from './Pages/register/Register';
import Learn from './Pages/learn/Learn';


function App() {

  const Layout = ()=>{
    return (
      <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/gigs",
        element:<Gigs/>
      },
      {
        path: "/gig/:id",
        element:<Gig/>
      },
      {
        path: "/orders",
        element:<Orders/>
      },
      {
        path: "/mygigs",
        element:<MyGigs/>
      },
      {
        path: "/add",
        element:<Add/>
      },
      {
        path: "/message/:id",
        element:<Message/>
      },
      {
        path: "/messages",
        element:<Messages/>
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      },
      {
        path: "/privacyPolicy",
        element:<PrivacyPolicy/>
      },
      {
        path: "/contactUs",
        element:<ContactUs/>
      },
      {
        path: "/learn",
        element:<Learn/>
      },
      ]
    },
  ]);
  
  return (
    <div>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
