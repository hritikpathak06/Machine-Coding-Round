import { createContext, useContext, useEffect, useState } from "react";

const CreateThemeContext = createContext<any | undefined>(undefined);

type ThemeContextProps = "light" | "dark";

export const ThemeContextProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ThemeContextProps | any>("light");

  const toggleTheme = () => {
    setTheme((prev: ThemeContextProps) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeContextProps;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <CreateThemeContext.Provider
      value={{ theme, setTheme, toggleTheme } as any}
    >
      {children}
    </CreateThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(CreateThemeContext);
};
