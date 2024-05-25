import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import userImg from "../../assets/user.png";
const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <Menu isLazy>
      <MenuButton>
        <div className="flex justify-center items-center gap-3">
          {" "}
          {userInfo?.fullName}
          {userInfo?.fullName && (
            <img src={userImg} alt="" className="profile-img" />
          )}
        </div>
      </MenuButton>
      <MenuList width={140} padding={10} rounded={5} bg={"white"}>
        {/* MenuItems are not rendered unless Menu is open */}

        <MenuItem
          className="hover:bg-slate-100 w-full py-2 rounded-sm px-8 text-center"
          onClick={onLogout}
        >
          LogOut
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileInfo;
