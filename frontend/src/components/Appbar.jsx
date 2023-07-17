import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../redux/auth/authActions";
// import theme from "../theme";
import logo from "../assets/logo.svg";

// import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";

const pages = [
  "Home",
  "About",
  "Cohort",
  "Tutoring",
  "Co-curricular",
  "Start Learning",
];

const getPageLink = (page) => {
  switch (page) {
    case "Home":
      return "/";
    case "About":
      return "/about";
    case "Cohort":
      return "/cohort";
    case "Tutoring":
      return "/tutoring";
    case "Co-curricular":
      return "/co-curricular";
    case "Start Learning":
      return "/start-learning";
    default:
      return "/";
  }
};

function ResponsiveAppBar({ isAuth, displayName }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      setAnchorElUser(null);
    }
  }, [isAuth]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLinkClick = () => {
    handleCloseNavMenu();
  };

  return (
    <ClickAwayListener onClickAway={handleCloseNavMenu}>
      <AppBar color="transparent" elevation={0} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              disableFocusRipple
              disableRipple
              aria-label="home"
              component={RouterLink}
              to="/"
            >
              <img height="100%" width="100%" src={logo} alt="logo" />
            </IconButton>
            <Box component="span">
              <Typography
                variant={{ xs: "body1", sm: "h6" }}
                sx={{
                  fontWeight: { xs: "bold", sm: "" },
                }}
              >
                StaryDream International School
              </Typography>
              <br />
              <Typography variant={{ xs: "body1", sm: "subtitle1" }}>
                Engage. Empower. Excel
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="nav-menu"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="nav-menu"
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
                onClose={handleCloseUserMenu}
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
                if (page === "Start Learning" && !isAuth) {
                  return null; // Skip rendering the 'Start Learning' button
                }
                return (
                  <Button
                    id="main-nav"
                    key={page}
                    sx={{ p: 1, mr: 2 }}
                    variant="text"
                    component={RouterLink}
                    to={getPageLink(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    onClick={handleOpenUserMenu}
                    color="inherit"
                    // randomize color
                  >
                    <Avatar
                      sx={{
                        background: "#2e9cdb",
                      }}
                    >
                      {/* {displayName
                        .split(" ")
                        .map((name) => name[0].toUpperCase())
                        .join("")} */}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="profile-menu"
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
                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleCloseUserMenu}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
              {!isAuth && (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/signin"
                  >
                    Signin
                  </Button>
                </Stack>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ClickAwayListener>
  );
}
export default ResponsiveAppBar;
