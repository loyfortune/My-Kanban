'use client'
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

  if (!resolvedTheme)
    return null;

  if (resolvedTheme === 'dark'){
    return <FiSun className="cursor-pointer w-5 h-5" onClick={() => setTheme('light')}/>
  }

    if (resolvedTheme === 'light'){
    return <FiMoon className="cursor-pointer w-5 h-5" onClick={() => setTheme('dark')}/>
  }
};

export default ThemeSwitcher