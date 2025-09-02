import { createContext, useContext, useEffect, useState } from "react";

import { SunIcon, MoonIcon } from "lucide-react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const themeStorageKey = "hodle-theme";

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "tanstack-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      // Only use localStorage in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme);
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [themeCount, themeCountSet] = useState(0);
  const { theme, setTheme } = useTheme();

  const isLabel = themeCount > 5 ? true : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
        themeCountSet(themeCount + 1);
      }}
      className="flex items-center gap-2 cursor-pointer transition-colors"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {theme === "dark" ? (
        <>
          <MoonIcon className="size-4" />
          {isLabel ? (
            <span className="uppercase tracking-widest text-xs">Vader</span>
          ) : null}
        </>
      ) : (
        <>
          <SunIcon className="size-4" />
          {isLabel ? (
            <span className="uppercase tracking-wider text-xs">Luke</span>
          ) : null}
        </>
      )}
    </div>
  );
};
