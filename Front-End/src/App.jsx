import React, { useState } from 'react';
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
  Outlet,
  Navigate,
  useLocation
} from "react-router-dom";
import './App.scss'
import Login from './Pages/login/Login';
import PrivacyPolicy from './Pages/privacy/PrivacyPolicy';
import ContactUs from './Pages/contactUs/ContactUs';
import Register from './Pages/register/Register';
import Learn from './Pages/learn/Learn';
import Community from './Pages/community/Community';
import CommunityProfile from './Pages/communityProfile/CommunityProfile';
import Course from './Pages/learn/Course';
import UpdateProfile from './Pages/updateProfile/UpdateProfile';
import Profile from './Pages/profile/Profile';
import Skills from './components/skills/Skills';
import { Language } from '@mui/icons-material';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminSidebar from './Pages/admin/AdminSidebar';
import { getAuthUser } from './localStorage/storage';
import AdminHeader from './Pages/admin/AdminHeader';
import Category from './Pages/admin/Category';
import AddCategory from './Pages/admin/AddCategory';
import UpdateCategory from './Pages/admin/UpdateCategory';
import ManageLearn from './Pages/admin/ManageLearn';
import AddCourse from './Pages/admin/AddCourse';
import LearnMenu from './components/LearnMenu/LearnMenu';
import PersistentDrawerLeft from './Pages/admin/test';
import MiniDrawer from './Pages/admin/test';
import ClientList from './Pages/admin/ClientList';
import AdminProfile from './Pages/admin/AdminProfile';


let dashboardData;

export function sidebarStatus(){
  return dashboardData;
}

export default function App() {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle)
  //   dashboardData = openSidebarToggle;
  // }



  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    dashboardData = !open;
    console.log(dashboardData);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dashboardData = !open;
    console.log(dashboardData);
  };


  const Admin = () => {
    const { pathname } = useLocation()

    const handleClasses = (pathname) => {
      if (pathname=="/adminDashboard") {
        return 'grid-container' 
      }
      else {
        if (pathname=="/manageLearn") {
          return "adminManageLearn"
        }
        return "adminGigsContainer"
      }
    }

    const auth = getAuthUser();
    return (
      <>
        {
          (auth.role == 'admin') ? 
          <>
          {/* <AdminHeader OpenSidebar={OpenSidebar}/> */}
          <div className={handleClasses(pathname)}>
            {/* <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} /> */}
            <MiniDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/>
            <Outlet />
          </div> 
          </>
          : <Navigate to={'/'} />
        }
      </>
    )
  }

  const Layout = () => {
    const scrollHandler = () => {
      if (window.location.href == "http://localhost:3001/") {
        if (window.scrollY > 600) {
          window.scrollTo(0, 660);
        }
      }
      else {
        // window.scrollBy(0, -200);
      }

      // window.scrollTo(0, 0);

      // console.log(window.location.href);

      // var element = document.getElementById("appScroll");
      // element.scrollBy(0, -element.scrollHeight);
    }

    const { pathname } = useLocation()

    const auth = getAuthUser();

    return (
      <>
        {/* {
          (auth.role == 'admin') && (
            <Navigate to={'/adminDashboard'} />
          )
        } */}

        {/* {
          (auth.role == 'admin') ? <Outlet /> : <Navigate to={'/'} />
        } */}

        {(pathname == "/test") ? <div onLoad={scrollHandler} id='appScroll' className="app">
          <Outlet />
        </div>  
        :
        <div onLoad={scrollHandler} id='appScroll' className="app">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
        }
        
      </>
    )
  }

  const router = createBrowserRouter([
    {
      // path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "/adminDashboard",
          element: <AdminDashboard />
        },
        {
          path: "/adminSidebar",
          element: <AdminSidebar />
        },
        {
          path: "/adminGigs",
          element: <Gigs />
        },
        {
          path: "/adminGigs/:category",
          element: <Gigs />
        },
        {
          path: "/category",
          element: <Category />
        },
        {
          path: "/addCategory",
          element: <AddCategory />
        },
        {
          path: "/updateCategory/:id",
          element: <UpdateCategory />
        },
        {
          path: "/manageLearn",
          element: <ManageLearn />
        },
        {
          path: "/addCourse",
          element: <AddCourse />
        },
        {
          path: "/clientList",
          element: <ClientList />
        },
        {
          path: "/adminProfile",
          element: <AdminProfile />
        },
      ]
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gigs/:category",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/requests",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/privacyPolicy",
          element: <PrivacyPolicy />
        },
        {
          path: "/contactUs",
          element: <ContactUs />
        },
        {
          path: "/learn",
          element: <Learn />
        },
        {
          path: "/course/:id",
          element: <Course />
        },
        {
          path: "/updateProfile",
          element: <UpdateProfile />
        },
        {
          path: "/community",
          element: <Community />
        },
        {
          path: "/communityProfile",
          element: <CommunityProfile />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/test",
          element: <MiniDrawer />
        }
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
