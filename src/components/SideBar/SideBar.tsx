import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  IoArrowForwardCircleOutline,
  IoHomeOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { GoPersonAdd } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import profile from "../../assets/profile.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

export default function SideBar() {
  let { userData }: any = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <>
      <div className="sidebarContainer vh-100">
        <Sidebar className="vh-100" collapsed={collapsed}>
          <div className="collapseButton ">
            {collapsed ? (
              <IoArrowForwardCircleOutline
                onClick={toggleSidebar}
                size={25}
                className="m-3"
              />
            ) : (
              <IoArrowBackCircleOutline
                onClick={toggleSidebar}
                size={25}
                className="m-3"
              />
            )}
          </div>
          <div className={`text-center py-3 ${collapsed ? "d-none" : ""}`}>
            <img
              src={userData?.image || profile}
              alt="profile"
              className={`profile-img rounded-circle d-block mx-auto p-1 border ${
                collapsed ? "collapsed" : ""
              }`}
              width="100"
              height="100"
            />
            <h5 className=" mt-2">{userData?.firstName}</h5>
          </div>
          <div className="sidebar-menu-wrapper d-flex flex-column justify-content-center">
            <Menu>
              <MenuItem
                icon={<IoHomeOutline />}
                component={<Link to="/dashboard"></Link>}
              >
                {!collapsed && "Dashboard"}
              </MenuItem>
              <MenuItem
                icon={<HiOutlineUsers />}
                component={<Link to="/dashboard/users"></Link>}
              >
                {!collapsed && "Users"}
              </MenuItem>
              <MenuItem
                icon={<GoPersonAdd />}
                component={<Link to="/dashboard/addUsers"></Link>}
              >
                {!collapsed && "Add User"}
              </MenuItem>
              <MenuItem
                icon={<CgProfile />}
                component={<Link to="/dashboard/profile"></Link>}
              >
                {!collapsed && "Profile"}
              </MenuItem>
              <MenuItem
                icon={<TbLogout2 />}
                component={<Link to="/logout"></Link>}
              >
                {!collapsed && "Logout"}
              </MenuItem>
            </Menu>
          </div>
        </Sidebar>
      </div>
    </>
  );
}
