import { BiSolidDashboard } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";


export const menu = [
  {
    label: "Home",
    path: "/dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    label: "Trips",
    path: "/dashboard/trips",
    icon: <FaCarAlt />,
  },
];
