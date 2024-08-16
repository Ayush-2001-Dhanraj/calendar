import React from "react";
import { ProtectedCompProps } from "../../common/interfaces";
import { useAppSelector } from "../../redux/store";
import { getUser } from "../../redux/appSlice";
import LoginView from "../../views/loginView";

function ProtectedComp({ children }: ProtectedCompProps) {
  const user = useAppSelector(getUser);

  return <>{user ? children : <LoginView />}</>;
}

export default ProtectedComp;
