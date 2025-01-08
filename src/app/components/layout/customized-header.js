"use client";
import { BsChevronDown } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const CustomizedHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    router.push("/");
  };

  return (
    <section className="h-[8vh] py-6 px-6 flex items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl">
          {pathname === "/dashboard/trips" ? "Trips Management" : "Trips Over Time"}
        </h1>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p>admin</p>
          <BsChevronDown onClick={handleClick} className=" cursor-pointer" />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            <Link className="text-sm" href="/profile">
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={logoutUser}>
            <p className="text-sm">Logout</p>
          </MenuItem>
        </Menu>
      </div>
    </section>
  );
};

export default CustomizedHeader;
