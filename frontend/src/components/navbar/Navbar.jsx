"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image"; // Import the Image component
import { useUser } from "../../app/utils/userContext";

export default function Navbar() {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId =user.userId;

  const isAuthenticated = user.email && user.password;

  return (
    <div className="flex justify-between items-center h-[80px] bg-white shadow-md px-[50px]">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="relative w-[100px] h-[80px]"> {/* Adjust width and height here */}
          <Image
            src="/images/logo.jpeg" // Path to your logo in the public folder
            alt="Company Logo"
            layout="fill" // This ensures the image fills the container
            objectFit="contain" // Adjusts image to fit within the container without cropping
          />
        </div>
      </div>
      <div>
        {isAuthenticated ? (
          <div>
            <Button className="mt-6 text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">
              <Link href={`/profile/${userId}`}>Profile</Link>
            </Button>
          </div>
        ) : (
          <Button
            className="text-black font-normal text-xl bg-gray-200 py-2 px-4 rounded-l"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Login
          </Button>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link href="/auth/sign-in/user">
            <MenuItem onClick={handleClose}>User Login</MenuItem>
          </Link>
          <Link href="/auth/sign-in/admin">
            <MenuItem onClick={handleClose}>Admin Login</MenuItem>
          </Link>
        </Menu>
      </div>
    </div>
  );
}
