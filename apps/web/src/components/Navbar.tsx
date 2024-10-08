import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import logoBF from "../images/logoBF.png";
import { useSession } from "../hooks/useSession";

function Navbar() {
  const { logout, isLogged } = useSession();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const options = React.useMemo(
    () => [
      {
        label: "Login",
        disabled: isLogged,
        handleClick: () => (window.location.href = "/login"),
      },
      { label: "Logout", disabled: !isLogged, handleClick: () => logout() },
    ],
    [isLogged]
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#EE6C78", height: 65 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logoBF}
            alt="BonsFluidos Logo"
            sx={{ mr: 1, width: 35, height: 30 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: "Playwrite CU, cursive",
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            BonsFluidos
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", flexGrow: 0 }}>
            <Tooltip title="Instagram">
              <IconButton
                href="https://www.instagram.com/bonsfluidosutfpr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="blank"
                sx={{ p: 0, mr: 2 }}
              >
                <Avatar
                  sx={{ width: 30, height: 30, backgroundColor: "#E01F4C" }}
                >
                  <InstagramIcon sx={{ fontSize: 30 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          
            <Tooltip title="Login">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ width: 30, height: 30, backgroundColor: "#E01F4C" }}
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} />
              </Avatar>
            </IconButton>
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
              {options.map(
                (option) =>
                  !option.disabled && (
                    <MenuItem
                      key={option.label}
                      onClick={() => {
                        handleCloseUserMenu();
                        option.handleClick();
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {option.label}
                      </Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
