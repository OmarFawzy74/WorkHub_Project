import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CategoryIcon from '@mui/icons-material/Category';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import Person4Icon from '@mui/icons-material/Person4';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import "./test.scss";



// import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../components/GigCard/GigCard";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthUser, removeAuthUser } from '../../localStorage/storage';
import { useEffect, useRef, useState } from "react";
import Gigs from '../gigs/Gigs';
import { sidebarStatus } from '../../App';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// export function sidebarStatus(){
//   console.log(sidebarData);
//   return sidebarData;
// }

export default function MiniDrawer({open, handleDrawerOpen, handleDrawerClose}) {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  //   sidebarData = !open;
  //   console.log(sidebarData);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  //   sidebarData = !open;
  //   console.log(sidebarData);
  // };

  const user = getAuthUser();

  let { category } = useParams();

  const [services, setServices] = useState({
    loading: false,
    results: null,
    err: null,
    reload: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/services/getAllServices")
      .then((resp) => {
        setServices({ results: resp.data.services, loading: false, err: null });
        console.log(resp.data.services);
      })
      .catch((err) => {
        console.log(err);
        // setConversation({ ...conversation, loading: false, err: err.response.data.errors });
      });
  }, [services.reload]);

  const [sort, setSort] = useState("sales");
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const reSort = (type) => {
    setSort(type);
    // setOpen(false);
  };

  const apply = () => {
    console.log(minRef.current.value)
    console.log(maxRef.current.value)
  }


  const navigate = useNavigate();

  const navigation = (e) => {
    let text = e.target.innerText;

    if (text == "Admin") {
      return navigate("/adminProfile");
    }

    if(text == "Dashboard") {
      return navigate("/adminDashboard");
    }

    if (text == "Gigs") {
      return navigate("/adminGigs");
    }

    if (text == "Categories") {
      return navigate("/category");
    }

    if (text == "Courses") {
      return navigate("/manageLearn");
    }

    if (text == "Clients") {
      return navigate("/clientList");
    }

    if (text == "Freelancers") {
      return navigate("/freelancerList");
    }

    if (text == "Orders") {
      return navigate("/ordersList");
    }

      if (text == "Community") {
        return navigate("/communityList");
      }

    text = e.target.dataset.testid;
    console.log();

    if(text == undefined) {
      text = e.target.nearestViewportElement.dataset.testid;
    }

    if(text == "") {
      return navigate("/adminProfile");
    }

    if(text == "DashboardIcon") {
      return navigate("/adminDashboard");
    }

    if(text == "MiscellaneousServicesIcon") {
      return navigate("/adminGigs");
    }

    if(text == "CategoryIcon") {
      return navigate("/category");
    }

    if(text == "SchoolIcon") {
      return navigate("/manageLearn");
    }

    if(text == "PersonIcon") {
      return navigate("/clientList");
    }

    if(text == "ShoppingCartIcon") {
      return navigate("/ordersList");
    }

    if(text == "PeopleIcon") {
      return navigate("/communityList");
    }

    if(text == "Person4Icon") {
      return navigate("/freelancerList");
    }

    // let value = e.target.nearestViewportElement.dataset.testid;

    console.log(text);
    // console.log(value);
    console.log(e);



    // console.log("tamam");
    // console.log(e.target.__reactProps$h2p2tj3bfnn.children);
    // console.log(e.target.__reactProps$8r0tzruwz8y);
    // console.log(e.target.innerText);
    // console.log(e);

  }

  const adminLogout = (e) => {
    e.preventDefault();
    const userId = user._id;
    console.log(userId);
    axios.put("http://localhost:3000/api/auth/logout/" + userId)
    .then((resp) => {
      console.log(resp);
      removeAuthUser();
      navigate("/");
    }).catch((errors) => {
      console.log(errors);
    })
  }




  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(sidebarStatus() && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
                <div className='sidebar-brand'>
                    <img src="/img/Logo.png" className='icon_header'/>
                    <h1 className='adminLogoName'>WorkHub</h1>
                </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{user.name}, 'Dashboard', 'Gigs', 'Orders', 'Categories', 'Courses', 'Community', 'Clients', 'Freelancers'].map((text, index) => (
            <ListItem key={text} id='text' onClick={navigation} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  onClick={navigation}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />} */}
                  {text == user.name ? <img className='profileIco' src={user.image_url} alt="" /> : null}
                  {text == "Dashboard" ? <DashboardIcon /> : null}
                  {text == "Gigs" ? <MiscellaneousServicesIcon /> : null}
                  {text == "Orders" ? <ShoppingCartIcon /> : null}
                  {text == "Categories" ? <CategoryIcon /> : null}
                  {text == "Courses" ? <SchoolIcon /> : null}
                  {text == "Community" ? <PeopleIcon /> : null}
                  {text == "Clients" ? <PersonIcon /> : null}
                  {text == "Freelancers" ? <Person4Icon /> : null}
                  {/* {text == "Categories" ? <CategoryIcon /> : null}
                  {text == "Dashboard" ? <DashboardIcon /> : null} */}
                  {/* <img src="/img/12.png" alt="" /> */}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}

            <ListItem key={"Logout"} id='text' onClick={adminLogout} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  onClick={navigation}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <Typography paragraph> */}

        {/* <div className="gigs">
      <div className={open ? "gigsContainer" : "allGigsContainer"}>
        <div className="breadcrumbs">
          {user == undefined ? <Link className="breadcrumbsLink" to={"/"}><img className="homeIconImg" src="./img/homeIcon.png" /> Home {'>'}</Link> : null}
        </div>

        {category !== undefined ?
          <>
            <h1 >Web Development</h1>
            <p>
              Explore the boundaries of art and technology with WorkHub's AI artists
            </p>
          </>
          : null}

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpenSortMenu(!openSortMenu)} />
            {openSortMenu && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className={open ? "gigsCards": "allGigsCards"}>
          {services.loading == false &&
            services.err == null &&
            services.results &&
            services.results.length > 0 &&
            services.results.map((service) => (
              <GigCard key={service._id} item={service} />
            ))}
        </div>
      </div>
    </div> */}
        {/* </Typography> */}
        {/* <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
}