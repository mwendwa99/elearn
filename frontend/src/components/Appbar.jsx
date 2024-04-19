import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/auth/authActions";
import { useModal } from "../context/ModalContext";
import logo from "../assets/logo.svg";

import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Stack,
  MenuItem,
  Container,
  Typography,
  Avatar,
  IconButton,
  Toolbar,
  Box,
  Button,
  Menu,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";

const pages = ["Home", "About", "Cohort", "Co-curricular"];
const settings = ["Profile", "Account", "Dashboard"];

const getPageLink = (page) => {
  switch (page) {
    case "Home":
      return "/";
    case "About":
      return "/about";
    case "Cohort":
      return "/cohort";
    case "Co-curricular":
      return "/co-curricular";
    case "Start Learning":
      return "/start-learning";
    default:
      return "/";
  }
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { user } = useSelector((state) => state.auth);

  // console.log("user", user);

  const handleLogout = () => {
    dispatch(logout());
    toast("Logged out successfully", { type: "info" });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div id="nav-menu-anchor-2">
            <IconButton
              disableFocusRipple
              disableRipple
              aria-label="home"
              component={RouterLink}
              to="/"
            >
              <img height="100%" width="100%" src={logo} alt="logo" />
            </IconButton>
          </div>
          <Box component="span" sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              sx={{
                fontWeight: { xs: "regular", sm: "bold" },
                fontSize: { xs: "body1.fontSize", sm: "h6.fontSize" },
              }}
            >
              StaryDream International School
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "body1.fontSize", sm: "subtitle.fontSize" },
              }}
            >
              Engage. Empower. Excel
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <div id="nav-menu-anchor">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "#2e9cdb",
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={RouterLink}
                  to={getPageLink(page)}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => {
              <Button
                id="main-nav"
                key={page}
                sx={{ p: 1, mr: 2 }}
                variant="text"
                component={RouterLink}
                to={getPageLink(page)}
                onClick={handleCloseNavMenu}
              >
                {page}
              </Button>;
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <div id="nav-menu-anchor-3">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user?.email} src={user?.photoURL} />
                    </IconButton>
                  </div>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={() => openModal("login")}>
                    Signin
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
