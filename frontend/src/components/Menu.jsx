import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authActions";
import { toast } from "react-toastify";

export default function BasicMenu({ data }) {
  const { userProfile } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (page) => {
    setAnchorEl(null);
    // console.log(lowerCasePage);

    navigate(`/${page}`);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    toast("Logged out successfully", { type: "info" });
    navigate("/");
  };
  // console.log(anchorEl);
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar alt="profile" src={userProfile?.photoURL} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {data.map((page) => (
          <MenuItem key={page} onClick={() => handleClose(page)}>
            {page}
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
