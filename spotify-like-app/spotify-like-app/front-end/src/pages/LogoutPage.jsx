import React from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../services/Auth";

export default function LogoutPage() {
  logout();
  return <Navigate to={"/login"} />;
}
