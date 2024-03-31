import React, { Profiler } from 'react'; 
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
import Profile from './Pages/profile/Profile';
import Community from './Pages/community/Community';
import CommunityProfile from './Pages/communityProfile/CommunityProfile';


function App() {

  const Layout = ()=>{
    const scrollHandler = () => {
      if(window.location.href == "http://localhost:3001/") {
        if(window.scrollY > 600) {
          window.scrollTo(0, 660);
        }
      }
      else {
        window.scrollBy(0, -200);
      }

      // window.scrollTo(0, 0);

      // console.log(window.location.href);

      // var element = document.getElementById("appScroll");
      // element.scrollBy(0, -element.scrollHeight);
    }

    return (
      <div onLoad={scrollHandler} id='appScroll' className="app">
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
      {
        path: "/profile",
        element:<Profile />
      },
      {
        path: "/community",
        element:<Community />
      },
      {
        path: "/communityProfile",
        element:<CommunityProfile />
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
