import { useState } from "react";

export const useLocalStorage = () => {
  const [value, setValue] = useState(null);

  const setItem = (key, v) => {
    localStorage.setItem(key, v);
    setValue(v);
  };

  const getItem = (key) => {
    const v = localStorage.getItem(key);
    setValue(v);
    console.log("use storage", v);
    return v;
  };

  const removeItem = (key ) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};