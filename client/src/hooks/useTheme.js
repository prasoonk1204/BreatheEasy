import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

        document.documentElement.classList.add(initialTheme);
        document.documentElement.classList.remove(initialTheme === 'dark' ? 'light' : 'dark');
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const isDark = theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return { theme, toggleTheme };
};
