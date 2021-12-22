import "./Header.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { productSelector } from "../../features/slices/product/productSlice";

// Material UI Components
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { userSelector } from "../../features/slices/user/userSlice";
import { loginUser } from "./../../features/slices/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header: React.FC = () => {
  const { user } = useAppSelector(userSelector);
  const u: any = localStorage.getItem("user");
  const localUser = JSON.parse(u);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // search handle
  const { basket } = useAppSelector(productSelector);
  const handleLogout = () => {
    dispatch(loginUser({ username: "", password: "" }));
    localStorage.removeItem("user");
    navigate("/login");
  };
  // account dropdown menu

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar__left">
          <Link to="/">
            <h1 className="page-title">Logo</h1>
          </Link>
        </div>
        <div className="topbar__right">
          <div className="bell-icon">
            <Link to="/">
              {" "}
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={basket?.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
          <div className="user-icon">
            {(user || localUser) && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                Hey,{" "}
                <span className="user-name">
                  {" "}
                  {user?.username || localUser.username}{" "}
                </span>{" "}
                <button
                  onClick={handleProfileClick}
                  style={{
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: "none",
                  }}
                >
                  <Avatar alt="profile" className="profile" />
                </button>
              </div>
            )}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />

              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
