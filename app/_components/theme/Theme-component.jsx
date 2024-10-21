// Theme.js
import * as React from "react";
import { useTheme } from "next-themes";
import styles from "../theme/styles.module.css";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <label htmlFor="theme" className={`${styles.theme} theme`}>
      <span className={`${styles.theme__toggleWrap} theme__toggle-wrap`}>
        <span className={`${styles.theme__fill} theme__fill`}></span>
        <span className={`${styles.theme__icon} theme__icon`}>
          {[...Array(9)].map((_, index) => (
            <span
              key={index}
              className={`${styles.theme__iconPart} theme__icon-part`}
            ></span>
          ))}
        </span>
        <input
          id="theme"
          className={`${styles.theme__toggle} theme__toggle`}
          type="checkbox"
          role="switch"
          name="theme"
          value={theme === "dark" ? "dark" : "light"}
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </span>
    </label>
  );
}
