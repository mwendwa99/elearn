import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { useModal } from "../context/ModalContext";
import Menu from "./Menu";
import Search from "./Search";

const drawerWidth = 240;
const navItems = ["Categories", "Join as a Tutor"];
const settings = ["Profile"];

function DrawerAppBar({ children, ...props }) {
  const { user, error } = useSelector((state) => state.auth);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        spacing={0}
        component={Link}
        to="/"
        className="text-decoration-none"
      >
        <Box className="me-2">
          <img src="logo.svg" alt="logo" />
        </Box>
        <Stack direction="column" spacing={0}>
          <Typography variant="body2" align="left">
            StaryDream
          </Typography>
          <Typography variant="body2" align="left">
            Engage. Empower. Excel
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              component={Link}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {user && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to={"dashboard"}>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <AppBar component="nav" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="div"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box className="me-2">
              <img src="logo.svg" alt="logo" />
            </Box>
            <Box component="div">
              <Typography variant="body2" align="left">
                StaryDreams
              </Typography>
              <Typography variant="body2" align="left">
                Engage. Empower. Excel
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mx: "auto", width: 300 }}>
            <Search />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
          >
            <Box className="d-flex flex-row">
              {navItems.map((item) => (
                <Button
                  key={item}
                  variant="text"
                  component={Link}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  sx={{
                    fontSize: "12px",
                    m: 1,
                    p: 0,
                    borderRadius: 0,
                    color:
                      location.pathname === "/" && item === "Home"
                        ? "#4883ff"
                        : location.pathname === `/${item.toLowerCase()}`
                        ? "#4883ff"
                        : "black",
                    borderBottom:
                      location.pathname === "/" && item === "Home"
                        ? "2px solid #4883ff"
                        : location.pathname === `/${item.toLowerCase()}`
                        ? "2px solid #4883ff"
                        : "none",
                  }}
                >
                  {item}
                </Button>
              ))}
              {user && (
                <Button
                  variant="text"
                  component={Link}
                  to={`dashboard`}
                  sx={{
                    fontSize: "14px",
                    borderRadius: 0,
                    color:
                      location.pathname === "/dashboard" ? "#4883ff" : "black",
                    borderBottom:
                      location.pathname === "/dashboard"
                        ? "2px solid #4883ff"
                        : "none",
                  }}
                >
                  Dashboard
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Menu data={settings} />
            ) : (
              <Button variant="contained" onClick={() => openModal("login")}>
                Signin
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" className="w-100">
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  children: PropTypes.node,
};

export default DrawerAppBar;
