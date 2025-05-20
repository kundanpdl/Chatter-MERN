import React from "react";
import { authStore } from "../store/authStore";

const Navbar = () => {
  const { logOut, authUser } = authStore();
  return <div>Navbar</div>;
};

export default Navbar;
