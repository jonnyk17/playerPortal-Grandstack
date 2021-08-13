import React from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Link as MUILink,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
} from "@material-ui/icons";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { PrivateRoute } from "./components";
import {
  Dashboard,
  CheckLogin,
  UserList,
  Login,
  Callback,
  Register,
} from "./pages";
import { addEventPage } from "./pages/addEventPage";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MUILink color="inherit" href="https://grandstack.io/">
        Player Portal
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  appBarImage: {
    maxHeight: "35px",
    paddingRight: "20px",
  },
  login: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { isAuthenticated, isLoading, logout } = useAuth0();
  if (isLoading) return <p>Loading</p>;
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <img
              className={classes.appBarImage}
              src={"/img/nike.png"}
              alt="GRANDstack logo"
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              The Player Portal
            </Typography>
            <Link
              to={isAuthenticated ? "/addevent" : ""}
              className={classes.navLink}
            >
              <Button variant="contained" color="primary">
                Add Event
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                logout({ returnTo: window.location.origin });
              }}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link
              to={isAuthenticated ? "/profile" : ""}
              className={classes.navLink}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>

            <Link
              to={isAuthenticated ? "/users" : ""}
              className={classes.navLink}
            >
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/" component={CheckLogin} />
              <PrivateRoute exact path="/profile" component={Dashboard} />
              <PrivateRoute exact path="/users" component={UserList} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/register" component={Register} />
              <PrivateRoute exact path="/addevent" component={addEventPage} />
              <Route exact path="/callback" component={Callback} />
              <Route render={() => <div>Not Found </div>} />
            </Switch>

            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}
