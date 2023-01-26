import { createContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    } else {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.removeItem('theme');
      localStorage.setItem('theme', 'light');
    }
    if (theme === 'light') {
      setTheme('dark');
      localStorage.removeItem('theme');
      localStorage.setItem('theme', 'dark');
    }
    console.log(theme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>;
}

export { ThemeContext };
