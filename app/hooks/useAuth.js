

import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const u = getItem("user");
    if (u) {
      addUser(JSON.parse(u));
    }
    console.log("useEffect useAuth", u);
  }, [addUser, getItem]);

  const login = (u) => {
    addUser(u);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, setUser };
};